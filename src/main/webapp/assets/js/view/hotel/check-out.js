var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        var paramObj = $.extend(caller.searchView.getData(), data);
        axboot.ajax({
            type: 'GET',
            url: '/api/v1/reservation',
            data: paramObj,
            callback: function (res) {
                caller.gridView01.setData(res);
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        });
        return false;
    },
    RSV_OPEN: function (caller, act, data) {
        if(!data) data = {};
        axboot.modal.open({
            width: 1000,
            height: 620,
            iframe: {
                param: "id=" + (data.id||"") + "&rsvNum=" + (data.rsvNum||""),
                url: "check-out-content.jsp"
            },
            header: {title: "체크 인"},
            callback: function (data) {
                if (data && data.dirty) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                }
                this.close();
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
    },
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result != "error") {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    }
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
        axboot.buttonClick(this, "data-page-btn", {
            search: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            clear: function () {
                fnObj.searchView.clear();
            },
            excel: function () {
            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    clear: function () {
        this.target.get(0).reset();
    },
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

        this.filter = $('.js-filter');
        this.rsvNum = $('.js-rsvNum');       
        this.rsvDtStart = this.target.find('.js-rsvDtStart');
        this.rsvDtEnd = this.target.find('.js-rsvDtEnd');
        this.arrDtStart = this.target.find('.js-arrDtStart');
        this.arrDtEnd = this.target.find('.js-arrDtEnd');
        this.depDtStart = this.target.find('.js-depDtStart');
        this.depDtEnd = this.target.find('.js-depDtEnd');
        this.roomTypCd = this.target.find('.js-roomTypCd');
    },
    getData: function () {
        var sttusCds = 'CHK_02';

        return {
            pageNumber: this.pageNumber || 0,
            pageSize: this.pageSize || 50,
            filter: this.filter.val(),
            rsvNum: this.rsvNum.val(),
            rsvDtStart: this.rsvDtStart.val(),
            rsvDtEnd: this.rsvDtEnd.val(),
            arrDtStart: this.arrDtStart.val(),
            arrDtEnd: this.arrDtEnd.val(),
            depDtStart: this.depDtStart.val(),
            depDtEnd: this.depDtEnd.val(),
            roomTypCd:this.roomTypCd.val(),
            sttusCd: sttusCds
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    getSttusCd: function () {
        return this.sttusCd.val();
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            onPageChange: function (pageNumber) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, { pageNumber: pageNumber });
            },
            showRowSelector: true,
            frozenColumnIndex: 0,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "rsvNum", label: "예약번호", width: 160, align: "center"},
                {
                    key: "rsvDt",
                    label: "예약일",
                    width: 100,
                    align: "center"
                },
                {key: "guestNm", label: "투숙객", width: 100, align: "center"},
                {
                    key: "roomTypCd",
                    label: "객실타입",
                    width: 130, 
                    align: "center", 
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['ROOM_TYPE'].map[this.value];
                    }
                },
                {key: "roomNum", label: "객실번호", width: 100, align: "center"},
                {key: "arrDt", label: "도착일", width: 100, align: "center"},
                {key: "depDt", label: "출발일", width: 100, align: "center"},
                {
                    key: "srcCd",
                    label: "예약경로",
                    width: 100,
                    align: "center",
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['PMS_RESERVATION_ROUTE'].map[this.value];
                    }
                },
                {
                    key: "saleTypCd",
                    label: "판매유형",
                    width: 100,
                    align: "center",
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['PMS_SALE_TYPE'].map[this.value];
                    }
                },
                {
                    key: "sttusCd",
                    label: "상태",
                    width: 100,
                    align: "center",
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['PMS_STAY_STATUS'].map[this.value];
                    }
                }
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, {selectedClear: true});
                },
                onDBLClick: function () {
                    ACTIONS.dispatch(ACTIONS.RSV_OPEN, this.item);
                },
            }
        });

        this.sttusCd = $('.js-sttusCd');
        axboot.buttonClick(this, "data-grid-view-01-btn", {
            change: function () {
                ACTIONS.dispatch(ACTIONS.STTUS_CHANGE);
            }
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.id;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    }
});