<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG"/>
        <ax:script-lang key="ax.base" var="COL"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/hotel/in-house.js' />"></script>
    </jsp:attribute>
    <jsp:body>

         <!-- 상단 버튼 -->
         <div data-page-buttons="">
            <div class="button-warp">
                <button type="button" class="btn btn-info" data-page-btn="search"><i class="cqc-magnifier"></i> 검색</button>
                <button type="button" class="btn btn-fn1" data-page-btn="clear">검색선택초기화</button>
                <button type="button" class="btn btn-info" data-page-btn="excel"><i class="cqc-file-excel-o"></i> 엑셀</button>
            </div>
        </div>

        <div role="page-header">
            <form name="searchView01" id="searchView01" class="js-searchForm" method="post">
                <div data-ax-tbl class="ax-search-tbl">
                    <div data-ax-tr>
                        <div data-ax-td style="width:400px">
                            <div data-ax-td-label>검색어</div>
                            <div data-ax-td-wrap>
                                <input type="text" name="filter" class="form-control js-filter" placeholder="투숙객명/전화번호/이메일" />
                            </div>
                        </div>
                        <div data-ax-td style="width:400px">
                            <div data-ax-td-label>예약번호</div>
                            <div data-ax-td-wrap>
                                <input type="text" class="form-control js-rsvNum">
                            </div>
                        </div>
                        <div data-ax-td style="width:400px">
                            <div data-ax-td-label>도착일</div>
                            <div data-ax-td-wrap>
                                <div class="input-group" data-ax5picker="date">
                                    <input type="text" class="form-control js-arrDtEnd" data-ax-path="arrDtEnd" placeholder="YYYY-MM-DD">
                                    <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="H10"></div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>도착 목록 </h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 500px;"></div>
            </div>
        </div>

    </jsp:body>
</ax:layout>