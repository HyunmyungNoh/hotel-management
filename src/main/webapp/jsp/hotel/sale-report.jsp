<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="css">
        <style>
            .grid-all-total {
                font-weight: bold;
                background-color: #fff;
            }
        </style>
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.base" var="COL"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/hotel/sale-report.js' />"></script>
    </jsp:attribute>
    <jsp:body>

         <!-- 상단 버튼 -->
         <div data-page-buttons="">
            <div class="button-warp">
                <button type="button" class="btn btn-info" data-page-btn="search"><i class="cqc-magnifier"></i> 검색</button>
                <button type="button" class="btn btn-info" data-page-btn="excel"><i class="cqc-file-excel-o"></i> 엑셀</button>
            </div>
        </div>

        <div role="page-header">
            <form name="searchView01" id="searchView01" class="js-searchForm" method="post">
                <div data-ax-tbl class="ax-search-tbl">
                    <div data-ax-tr>
                        <div data-ax-td style="width:100%">
                        <!-- <div data-ax-td> -->
                            <div data-ax-td-label>조회날짜</div>
                            <div data-ax-td-wrap>
                                <div class="form-inline">
                                    <button type="button" class="btn btn-default" data-search-btn="day" data-value="0"> 오늘</button>
                                    <button type="button" class="btn btn-default" data-search-btn="day" data-value="1"> 어제</button>
                                    <button type="button" class="btn btn-default" data-search-btn="day" data-value="3"> 3일</button>
                                    <button type="button" class="btn btn-default" data-search-btn="day" data-value="7"> 7일</button>
                                    <button type="button" class="btn btn-default" data-search-btn="month" data-value="1"> 1개월</button>
                                    <button type="button" class="btn btn-default" data-search-btn="month" data-value="3"> 3개월</button>
                                    <button type="button" class="btn btn-default" ddata-search-btn="month" data-value="6"> 6개월</button>
                                    <button type="button" class="btn btn-default" data-search-btn="year" data-value="1"> 1년</button>
                                    <!-- <button type="button" class="btn btn-default" data-grid-view-01-btn="year"> 1년</button> -->
                                    <div class="input-group" data-ax5picker="date">
                                        <input type="text" class="form-control js-rsvDtStart" placeholder="yyyy-mm-dd">
                                        <span class="input-group-addon">~</span>
                                        <input type="text" class="form-control js-rsvDtEnd" placeholder="yyyy-mm-dd">
                                        <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="H10"></div>
        </div>

        <div data-ax5layout="ax1" role="page-content" data-config="{layout:'split-panel', orientation: 'horizontal', splitter: {size: 7}}">
            <div data-split-panel="{width: '*'}">
                <div style="padding-right: 10px;" class="" data-split-panel-wrap="">

                    <!-- 목록 -->
                    <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                        <div class="left">
                            <h2><i class="cqc-list"></i> 보고서</h2>
                        </div>
                    </div>
                    <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 500px;"></div>
                </div>
            </div>
        </div>

    </jsp:body>
</ax:layout>