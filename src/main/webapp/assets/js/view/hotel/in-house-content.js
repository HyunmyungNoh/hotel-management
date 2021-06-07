var modalParams = modalParams || {};
var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        /* if (parent) {
            parent.axboot.modal.close(data);
        } */
        var modal = fnObj.getModal();
        if (modal) modal.close();
        if (opener) window.close();
    },
    PAGE_SEARCH: function (caller, act, data) {
        if (data) {
            axboot.ajax({
                type: 'GET',
                url: '/api/v1/reservation/' + data,
                callback: function (res) {
                    caller.formView01.setData(res);
                    caller.gridView01.setData(res.memos || []);
                },
                options: {
                    onerror: function (err) {
                        console.log(error);
                    }
                }
            })
        }
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView01.validate()) {
            var item = caller.formView01.getData();

            // 메모리스트
            var memoList = [].concat(caller.gridView01.getData());
            memoList = memoList.concat(caller.gridView01.getData('deleted'));
            item.memos = memoList;

            // if (!item.id) item.__created__ = true;
            axboot.ajax({
                type: 'POST',
                url: '/api/v1/reservation/checkOut',
                data: JSON.stringify(item),
                callback: function (res) {
                    axDialog.alert('저장 되었습니다', function () {
                        if (parent && parent.axboot && parent.axboot.modal) {
                            parent.axboot.modal.callback({ dirty: true });
                        }
                    });
                }
            });
        }
    },
    CHECK_CANCEL: function (caller, act, data) {
        if (caller.formView01.validate()) {
            var item = caller.formView01.getData();

            // 메모리스트
            var memoList = [].concat(caller.gridView01.getData());
            memoList = memoList.concat(caller.gridView01.getData('deleted'));
            item.memos = memoList;

            // if (!item.id) item.__created__ = true;
            axboot.ajax({
                type: 'POST',
                url: '/api/v1/reservation/checkCancel',
                data: JSON.stringify(item),
                callback: function (res) {
                    axDialog.alert('저장 되었습니다', function () {
                        if (parent && parent.axboot && parent.axboot.modal) {
                            parent.axboot.modal.callback({ dirty: true });
                        }
                    });
                }
            });
        }
    },
    FIND_GUEST: function (caller, act, data) {
        var data = caller.formView01.model.get()||{};
        caller.guestContentView.open(data);
    },
    ALLOC_ROOM: function (caller, act, data) {
        var data = caller.formView01.model.get()||{};
        caller.roomInfoView.open(data);
    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({ msg: LANG('ax.script.form.clearconfirm') }, function () {
            if (this.key == 'ok') {
                caller.gridView01.clear();
                caller.formView01.clear();
                $('.js-rsvNum').empty();
                console.log('지워졌습니다');
                $('[data-ax-path="arrDt"]').focus();
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

// 모달창이 중첩될 때 처리
fnObj.getModal = function() {
    var modalView;
    if (parent && modalParams.modalView && (modalView = parent[axboot.def.pageFunctionName][modalParams.modalView])) {
        return modalView;
    } else if (opener && modalParams.modalView && (modalView = opener[axboot.def.pageFunctionName][modalParams.modalView])) {
        return modalView;
    } else if (parent && parent.axboot && parent.axboot.modal) {
        return parent.axboot.modal;
    }
}

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    if (modalParams.id && modalParams.rsvNum) {
        $('.js-rsvNum').text(modalParams.rsvNum);
    } else {
        axDialog.alert("예약번호는 필수입니다.", function () {
            ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
        });
    }
    this.pageButtonView.initView();
    this.gridView01.initView();
    this.formView01.initView();
    this.guestContentView.initView();
    this.roomInfoView.initView();

    if(modalParams.id) ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, modalParams.id);
};

fnObj.pageResize = function () {};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, 'data-page-btn', {
            checkOut: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            checkCancel: function () {
                ACTIONS.dispatch(ACTIONS.CHECK_CANCEL);
            },
            close: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
        });
    },
});

//== view 시작

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
        this.target.addRow({ __created__: true, memoDtti: moment().format('YYYY-MM-DD hh:mm'), delYn: 'N' }, 'last');
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
            this.model.set('guestNmEng', data.guestNmEng||'');
            this.model.set('guestTel', data.guestTel||'');
            this.model.set('email', data.email||'');
            this.model.set('gender', data.gender||'');
            this.model.set('langCd', data.langCd||'');
            this.model.set('brth', data.brth||'');
            this.model.set('rmk', data.rmk||'');
        }
    },
    setRoom: function(data) {
        if (data) {
            this.model.set('roomId', data.id||'');
            this.model.set('roomNum', data.roomNum||'');
        }
    },
    getDefaultData: function () {
        return {adultCnt: '1', chldCnt: '0'};
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        if ($('.js-advnYn').is(':checked') == true) {
            data.advnYn = 'Y';
        } else data.advnYn = 'N';
        return $.extend({}, data);
    },
    setData: function (data) {
        if (typeof data === 'undefined') data = this.getDefaultData();
        data = $.extend({}, modalParams.rsvNum, data);

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
    InitEvent: function () {
        var _this = this;

        axboot.buttonClick(this, 'data-grid-view-01-btn', {
            allocate: function () {
                ACTIONS.dispatch(ACTIONS.ALLOC_ROOM)
            },
            search: function () {
                ACTIONS.dispatch(ACTIONS.FIND_GUEST);
            }
        });

        // 날짜 계산 분기
        this.arrDt.on('change', function () {
            var arrDt = $(this).val();
            var depDt = _this.depDt.val();
            if(!arrDt || !depDt) return;

            var resArrDt = moment(arrDt);
            var resDepDt = moment(depDt);
            var nightCnt = resDepDt.diff(resArrDt, 'days');
            
            if (nightCnt < 1) {
                nightCnt = 1;
                _this.model.set('depDt', resArrDt.add(nightCnt, 'days').format('yyyy-MM-DD'));
            }
            _this.model.set('nightCnt', nightCnt);
        });

        this.depDt.on('change', function () {
            var arrDt = _this.arrDt.val();
            var depDt = $(this).val();
            if(!arrDt || !depDt) return;

            var resArrDt = moment(arrDt);
            var resDepDt = moment(depDt);
            var nightCnt = resDepDt.diff(resArrDt, 'days');
            if (nightCnt < 1) {
                nightCnt = 1;
                _this.model.set('depDt', resArrDt.add(-nightCnt, 'days').format('yyyy-MM-DD'));
            }
            _this.model.set('nightCnt', nightCnt);
        });
        
        this.nightCnt.on('change', function () {
            var arrDt = _this.arrDt.val();
            if(!arrDt) return;

            var nightCnt = _this.nightCnt.val();
            if (nightCnt < 1) {
                nightCnt = 1;
                _this.model.set('nightCnt', nightCnt);
            }
            _this.model.set('depDt', moment(arrDt).add(nightCnt, 'days').format('yyyy-MM-DD'));
        });
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

        this.arrDt = $('[data-ax-path="arrDt"]');
        this.depDt = $('[data-ax-path="depDt"]');
        this.nightCnt = $('[data-ax-path="nightCnt"]');

        this.InitEvent();
    },
});

/**
 * 투숙객 모달 창
 */
fnObj.guestContentView = axboot.viewExtend({
    open: function(data) {
        // var _this = this;
        if(!data) data = {};

        this.modal.open({
            width: 780,
            height: 550,
            iframe: {
                param: 'guestNm=' + (data.guestNm||'') + '&guestTel=' + (data.guestTel||'')
                        + '&email=' + (data.email||'') +  '&modalView=guestContentView',
                url: "guest-content.jsp"
            },
            header: { title: '투숙객 목록' }
        });
    },
    close: function () {
        this.modal.close();
    },
    callback: function (data) {
        fnObj.formView01.setGuest(data);
        this.modal.close();
    },
    initView: function () {
        // 새로운 인스턴스 생성
        this.modal = new ax5.ui.modal();
    }
});

/**
 * 객실 모달 창
 */

fnObj.roomInfoView = axboot.viewExtend({
    open: function(data) {
        // var _this = this;
        if(!data) data = {};

        this.modal.open({
            width: 600,
            height: 300,
            iframe: {
                param: 'roomTypCd=' + (data.roomTypCd||'') + "&modalView=roomInfoView",
                url: "room-info-content.jsp"
            },
            header: { title: '객실 배정' }
        });
    },
    close: function () {
        this.modal.close();
    },
    callback: function (data) {
        fnObj.formView01.setRoom(data);
        this.modal.close();
    },
    initView: function () {
        // 새로운 인스턴스 생성
        this.modal = new ax5.ui.modal();
    }
});