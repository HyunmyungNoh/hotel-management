var modalParams = modalParams || {};
var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        var modal = fnObj.getModal();
        if (modal) modal.close();
        if (opener) window.close();
    },
    PAGE_SEARCH: function (caller, act, data) {
        var paramObj = $.extend({}, modalParams, data);

        axboot.ajax({
            type: "GET",
            url: "/api/v1/hotel/roomInfo",
            data: paramObj,
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
    },
    PAGE_CHOICE: function (caller, act, data) {
        if (!data) {
            var list = caller.gridView01.getData('selected');
            if (list.length > 0) data = list[0];
        } if (data) {
            var modal = fnObj.getModal();
            if (modal) modal.callback(data);
            if (opener) window.close();
        } else {
            alert(LANG('ax.script.requireslect'));
        }
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
    var _this = this;

    _this.pageButtonView.initView();
    _this.gridView01.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
}

fnObj.pageResize = function () {};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, 'data-page-btn', {
            choice: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CHOICE, this.item);
            },
            close: function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
        });
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
            showRowSelector: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "roomNum", label: "객실번호", width: 100, align: "center", editor: "text"},
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
                {
                    key: "roomSttusCd",
                    label: "객실상태",
                    width: 100, 
                    align: "center", 
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['ROOM_STATUS'].map[this.value];
                    }
                },
                {
                    key: "clnSttusCd",
                    label: "청소상태",
                    width: 100, 
                    align: "center", 
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['CLEAN_STATUS'].map[this.value];
                    }
                },
                {
                    key: "svcSttusCd",
                    label: "서비스상태",
                    width: 100, 
                    align: "center", 
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['SVC_STATUS'].map[this.value];
                    }
                }
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, { selectedClear: true });
                },
                onDBLClick: function () {
                    ACTIONS.dispatch(ACTIONS.PAGE_CHOICE, this.item);
                }
            }
        });
    },
});
