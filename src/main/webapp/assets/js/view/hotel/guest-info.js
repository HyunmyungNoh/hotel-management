var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        var paramObj = $.extend(caller.searchView.getData(), data);

        axboot.ajax({
            type: 'GET',
            url: '/api/v1/education/teachgridform',
            data: paramObj,
            callback: function (res) {
                caller.formView01.clear();
                caller.gridView01.setData(res);
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                },
            },
        });
    },
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView01.validate()) {
            var item = caller.formView01.getData();

            var fileIds = [];
            var files = ax5.util.deepCopy(caller.formView01.UPLOAD.uploadedFiles);
            $.each(files, function(idx, o) {
                fileIds.push(o.id);
            });
            item.fileIdList = fileIds;

            if (!item.id) item.__created__ = true;
            axboot.ajax({
                type: 'POST',
                url: '/api/v1/education/teachgridform',
                data: JSON.stringify(item),
                callback: function (res) {
                    axToast.push('저장 되었습니다');
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                },
            });
        }
    },
    PAGE_DELETE: function (caller, act, data) {
        axDialog.confirm({ msg: '삭제하시겠습니까?' }, function () {
            if (this.key == 'ok') {
                var items = caller.gridView01.getData('selected');
                if (!items.length) {
                    axDialog.alert('삭제할 데이터가 없습니다.');
                    return false;
                }

                var ids = items.map(function (value) {
                    return value.id;
                });

                axboot.ajax({
                    type: 'DELETE',
                    url: '/api/v1/education/teachgridform?ids=' + ids.join(','),
                    callback: function (res) {
                        axToast.push('삭제 되었습니다');
                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    },
                });
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        //그리드에값을 바인딩 할수있으나 id를 통해서 조회후 바인딩하도록 프로세스 정의
        //fnObj.formView01.setData(this.item);
        var id = (data || {}).id;
        if (!id) {
            axDialog.alert('id는 필수입니다.');
            return false;
        }
        axboot.ajax({
            type: 'GET',
            url: '/api/v1/education/teachgridform/' + id,
            callback: function (res) {
                caller.formView01.setData(res);
            },
        });
    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({ msg: LANG('ax.script.form.clearconfirm') }, function () {
            if (this.key == 'ok') {
                caller.formView01.clear();
                $('[data-ax-path="companyNm"]').focus();
            }
        });
    },
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result != 'error') {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();
    this.formView01.initView({
        viewMode: false,
        editorReady: function () {
            //_this.formView01.resize();
        }
    });
    this.gridView02.initView();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, 'data-page-btn', {
            search: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            save: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            fn1: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            }
        });
    },
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document['searchView0']);
        this.target.attr('onsubmit', 'return false;');
        this.target.on('keydown.search', 'input, .form-control', function (e) {
            if (e.keyCode === 13) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });

        this.useYn = $('.js-useYn').on('change', function () {
            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        });
        this.filter = $('.js-filter');
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber || 0,
            pageSize: this.pageSize || 50,
            useYn: this.useYn.val(),
            filter: this.filter.val(),
        };
    },
});

/**
 * gridView01
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        this.target = axboot.gridBuilder({
            onPageChange: function (pageNumber) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, { pageNumber: pageNumber });
            },
            showRowSelector: true,
            frozenColumnIndex: 0,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                { key: 'companyNm', label: "이름", width: 100, align: 'center' },
                { key: 'ceo', label: "연락처", width: 100, align: 'center' },
                { key: 'useYn', label: "이메일", width: 150, align: 'center' },
                { key: 'bizno', label: "성별", width: 50, align: 'center' },
                { key: 'bizno', label: "생년월일", width: 100, align: 'center' },
            ],
            body: {
                onClick: function () {
                    // grid.body.onClick.call({self: this, dIndex: 0, item: this.list[0]});
                    this.self.select(this.dindex, { selectedClear: true });
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                },
            },
        });
    },
});

/**
 * formView
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return { useYn: 'Y' };
    },
    getData: function () {
        var _this = this;

        var remark = "";
        if (_this.editor) remark = _this.editor.getData();
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        data.remark = remark;
        return $.extend({}, data);
    },
    setData: function (data) {
        if (typeof data === 'undefined') data = this.getDefaultData();
        data = $.extend({}, data);

        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경

        var _this = this;

        if (typeof data.fileList != 'undefined' && data.fileList.length > 0) {
            _this.UPLOAD.setUploadedFiles(data.fileList);
        }
    },
    validate: function () {
        var item = this.model.get();

        var rs = this.model.validate();
        if (rs.error) {
            axDialog.alert(LANG('ax.script.form.validate', rs.error[0].jquery.attr('title')), function () {
                rs.error[0].jquery.focus();
            });
            return false;
        }

        // required 이외 벨리데이션 정의
        var pattern;
        if (item.email) {
            pattern = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.(?:[A-Za-z0-9]{2,}?)$/i;
            if (!pattern.test(item.email)) {
                axDialog.alert('이메일 형식을 확인하세요.', function () {
                    $('[data-ax-path="email"]').focus();
                });
                return false;
            }
        }

        if (item.bizno && !(pattern = /^([0-9]{3})\-?([0-9]{2})\-?([0-9]{5})$/).test(item.bizno)) {
            axDialog.alert('사업자번호 형식을 확인하세요.'),
                function () {
                    $('[data-ax-path="bizno"]').focus();
                };
            return false;
        }

        return true;
    },
    initEvent: function () {
        axboot.buttonClick(this, 'data-form-view-01-btn', {
            'form-clear': function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            },
        });
    },
    initView: function (obj) {
        var _this = this; // fnObj.formView01

        _this.target = $('.js-form');

        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

        // this.initUploader();
        this.initEvent();
    },
});

/**
 * gridView02
 */
 fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        this.target = axboot.gridBuilder({
            onPageChange: function (pageNumber) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, { pageNumber: pageNumber });
            },
            /* showRowSelector: true,
            frozenColumnIndex: 0,
            multipleSelect: true, */
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                { key: 'companyNm', label: "투숙일", width: 180, align: 'center' },
                { key: 'ceo', label: "숙박수", width: 80, align: 'center' },
                { key: 'useYn', label: "객실타입", width: 80, align: 'center' },
                { key: 'bizno', label: "투숙번호", width: 180, align: 'center' },
            ],
            body: {
                onClick: function () {
                    // grid.body.onClick.call({self: this, dIndex: 0, item: this.list[0]}); 아래는 이벤트 없으니 필요 없을지도
                    /* this.self.select(this.dindex, { selectedClear: true });
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item); */
                },
            },
        });
    },
});
