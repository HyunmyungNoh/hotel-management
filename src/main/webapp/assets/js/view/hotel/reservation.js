var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: 'GET',
            url: ['samples', 'parent'],
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                },
            },
        });

        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
        var saveList = [].concat(caller.gridView01.getData('modified'));
        saveList = saveList.concat(caller.gridView01.getData('deleted'));

        axboot.ajax({
            type: 'POST',
            url: '/api/v1/reservation',
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push('저장 되었습니다');
            },
        });
    },
    FIND_GUEST: function (caller, act, data) {
        var data = caller.formView01.model.get()||{};
        // if (!data) data = {};

        axboot.modal.open({
            width: 780,
            height: 550,
            iframe: {
                param: 'guestNm=' + (data.getNm||'') + '&guestTel=' + (data.guestTel||'') + '&email=' + (data.email||''),
                url: "guest-content.jsp"
            },
            header: { title: '투숙객 목록' },
            callback: function (data) {
                caller.formView01.setGuest(data);
                this.close();
            }
        });
    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({ msg: LANG('ax.script.form.clearconfirm') }, function () {
            if (this.key == 'ok') {
                caller.gridView01.clear();
                caller.formView01.clear();
                console.log('지워졌습니다');
                // $('[data-ax-path="companyNm"]').focus();
            }
        });
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow('selected');
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
    this.formView01.initView();

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
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            },
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
        this.target.attr('onsubmit', 'return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);');
        this.filter = $('#filter');
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val(),
        };
    },
});

/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: true,
            frozenColumnIndex: 0,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {
                    key: 'memoDtti',
                    label: '작성일',
                    width: 160,
                    align: 'center',
                    editor: 'text',
                    formatter: function() {
                        return moment(this.value).format('YYYY-MM-DD');
                    }
                },
                { key: 'memoCn', label: '메모', width: '*', align: 'left', editor: 'text' },
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, { selectedClear: true });
                },
            },
        });

        axboot.buttonClick(this, 'data-grid-view-01-btn', {
            add: function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            delete: function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            },
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == 'modified' || _type == 'deleted') {
            list = ax5.util.filter(_list, function () {
                return this.id;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        // this.target.addRow({__created__: true, writeDt: ax5.util.date(new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12), {return: 'yyyy-MM-dd'})}, "last");
        this.target.addRow({ __created__: true, memoDtti: moment().format('YYYY-MM-DD hh:mm'), delYn: 'Y' }, 'last');
        // this.target.addRow({__created__: true}, "last");
    },
});

/**
 * formView
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    setGuest: function(data) {
        if (data) {
            this.model.set('guestId', data.id||'');
            this.model.set('guestNm', data.guestNm||'');
            this.model.set('guestTel', data.guestTel||'');
            this.model.set('email', data.email||'');
            this.model.set('gender', data.gender||'');
            this.model.set('langCd', data.langCd||'');
            this.model.set('brth', data.brth||'');
        }
    },
    getDefaultData: function () {
        return {};
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        return $.extend({}, data);
    },
    setData: function (data) {
        if (typeof data === 'undefined') data = this.getDefaultData();
        data = $.extend({}, data);

        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
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
    calcDepDt: function (arrDt, nightCnt) {
        var depDt = moment(arrDt).add(nightCnt, 'days').format('yyyy-MM-DD');
        $('[data-ax-path="depDt"]').val(depDt).trigger('change');
    },
    calcNight: function (arrDt, depDt) {
        var nightCnt = moment(depDt).diff(moment(arrDt), 'days');
        $('[data-ax-path="nightCnt"]').val(nightCnt).trigger('change');
    },
    initView: function () {
        var _this = this; // fnObj.formView01

        _this.target = $('.js-form');

        _this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: 'auto',
            content: {
                type: 'date',
            },
        });

        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작

        /* 분기를 여기서 두 번 태움  */
        $('.js-arrDt').on('change', function () {
            var arrDt = $(this).val();
            $('.js-nightCnt').on('change', function () {
                var nigntCnt = $(this).val();
                _this.calcDepDt(arrDt, nigntCnt);
            });
        });

        $('.js-arrDt').on('change', function () {
            var arrDt = $(this).val();
            $('.js-depDt').on('change', function () {
                var depDt = $(this).val();
                _this.calcNight(arrDt, depDt);
            });
        });

        axboot.buttonClick(this, 'data-grid-view-01-btn', {
            search: function () {
                ACTIONS.dispatch(ACTIONS.FIND_GUEST);
            },
        });
    },
});
