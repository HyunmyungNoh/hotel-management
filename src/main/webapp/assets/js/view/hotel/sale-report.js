var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        if (data) {
            axboot.ajax({
                type: 'GET',
                url: '/api/v1/reservation/' + data,
                callback: function (res) {
                    caller.formView01.clear();
                    caller.formView01.setData(res);
                },
                options: {
                    onerror: function (err) {
                        console.log(error);
                    }
                }
            })
        }
        return false;   // 이 부분을 왜 넣는지?
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
                url: '/api/v1/reservation',
                data: JSON.stringify(item),
                callback: function (res) {
                    // axToast.push('저장 되었습니다');
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, res.map.rsvNum);  // 나중에 promise로 리팩토링
                    axToast.push(res.map.message);
                    
					// caller.formView01.clear();
                    // caller.gridView01.clear();
                },
            });
        }
    },
    FIND_GUEST: function (caller, act, data) {
        var data = caller.formView01.model.get()||{};

        axboot.modal.open({
            width: 780,
            height: 550,
            iframe: {
                param: 'guestNm=' + (data.guestNm||'') + '&guestTel=' + (data.guestTel||'')
                        + '&email=' + (data.email||''),
                url: "guest-content.jsp"
            },
            header: { title: '투숙객 목록' },
            callback: function (data) {
                caller.formView01.setGuest(data);
                this.close();
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

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, 'data-page-btn', {
            save: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
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
        this.target = $('.js-searchForm');
        // this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.target.attr("onsubmit", "return false;");
        this.target.on('keydown.search', 'input, .form-control', function (e) {
            if (e.keyCode === 13) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });

        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: 'auto',
            content: {
                type: 'date',
            }
        });
      
        this.rsvDtStart = this.target.find('.js-rsvDtStart');
        this.rsvDtEnd = this.target.find('.js-rsvDtEnd');

        $('[data-search-btn]').on('click', function () {
            var _this = $(this),
                searchBtn = _this.data('searchBtn'),
                value = Number(_this.data('value'));

            if (isNaN(value) || !isFinite(value)) return false;
            var endDateValue = moment().format('yyyy-MM-DD'),
                startDateValue = moment().add(-value, searchBtn).format('yyyy-MM-DD');

            _this.rsvDtEnd.val(endDateValue);
            _this.rsvDtStart.val(startDateValue);

            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        });
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber || 0,
            pageSize: this.pageSize || 50,
            rsvDtStart: this.rsvDtStart.val(),
            rsvDtEnd: this.rsvDtEnd.val()
        }
    }
});

/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 1,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {
                    key: 'rsvDt',
                    label: '날짜',
                    width: 100,
                    align: 'center',
                    styleClass: function () {
                        return this.item.rsvDt === '합계' ? 'grid-all-total' : '';
                    }
                },
                {
                    key: 'count',
                    label: '투숙건수',
                    width: 120,
                    align: 'center',
                    styleClass: function () {
                        return this.item.rsvDt === '합계' ? 'grid-all-total' : '';
                    }
                },
                {
                    key: 'salePrc',
                    label: '판매금액',
                    width: 150,
                    align: 'center',
                    styleClass: function () {
                        return this.item.rsvDt === '합계' ? 'grid-all-total' : '';
                    }
                },
                {
                    key: 'svcPrc',
                    label: '서비스금액',
                    width: 150,
                    align: 'center',
                    styleClass: function () {
                        return this.item.rsvDt === '합계' ? 'grid-all-total' : '';
                    }
                },
                {
                    key: 'salePrc',
                    label: '합계',
                    width: 150,
                    align: 'center',
                    styleClass: function () {
                        return this.item.rsvDt === '합계' ? 'grid-all-total' : '';
                    }
                }
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
        data = $.extend({}, data);
        if (data.rsvNum) {
            $('.js-rsvNum').text('예약번호: ' + data.rsvNum);
        }

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
            search: function () {
                ACTIONS.dispatch(ACTIONS.FIND_GUEST);
            },
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
