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
        var paramObj = $.extend({}, modalParams, data);

        axboot.ajax({
            type: 'GET',
            url: '/api/v1/guest/',
            data: paramObj,
            callback: function (res) {
                caller.gridView01.setData(res);
                caller.formView01.clear();
            },
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        caller.formView01.setData(data || {});
        //그리드에값을 바인딩 할수있으나 id를 통해서 조회후 바인딩하도록 프로세스 정의
        //fnObj.formView01.setData(this.item);
        /* var id = (data || {}).id;
        if (!id) {
            axDialog.alert('id는 필수입니다.');
            return false;
        }
        */
       // 사실 그리드에 원클릭, 더블클릭이 두 번 걸쳐 있는데 
       // 원클릭 시 이미 ajax 통신을 태우기 때문에 그동안 block이 되버리고
       // 그래서 더블클릭 이벤트를 호출하지 못함.
        // var id = (data || {}).id;
        // axboot.ajax({
        //     type: 'GET',
        //     url: '/api/v1/guest/' + id,
        //     callback: function (res) {
        //         caller.formView01.setData(res);
        //         // caller.gridView02.clear();
        //     },
        // });
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
    _this.formView01.initView();

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
                { key: 'guestNm', label: "이름", width: 100, align: 'center' },
                { key: 'guestTel', label: "연락처", width: 100, align: 'center' },
                { key: 'email', label: "이메일", width: 150, align: 'center' },
                {
                    key: 'gender',
                    label: "성별",
                    width: 50,
                    align: 'center',
                    formatter: function () {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['SEX_TYPE'].map[this.value];
                    }
                },
                {
                    key: 'brth',
                    label: "생년월일",
                    width: 100,
                    align: 'center'
                }, 
                {
                    key: 'langCd',
                    label: "언어", 
                    width: 80,
                    align: 'center',
                    formatter: function() {
                        if (!this.value) return '';
                        return parent.COMMON_CODE['PMS_LANG'].map[this.value];
                    },
                 }
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex, { selectedClear: true });
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                },
                onDBLClick: function () {
                    ACTIONS.dispatch(ACTIONS.PAGE_CHOICE, this.item);
                },
            },
        });
    },
});

/**
 * formView01
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
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
    },
});
