<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%
    RequestUtils requestUtils = RequestUtils.of(request);
    request.setAttribute("guestNm", requestUtils.getString("guestNm"));
    request.setAttribute("guestTel", requestUtils.getString("guestTel"));
    request.setAttribute("email", requestUtils.getString("email"));
    request.setAttribute("modalView", requestUtils.getString("modalView"));
%>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <script>
            var modalParams = {guestNm: "${guestNm}", guestTel: "${guestTel}", email: "${email}", modalView: "${modalView}"};
        </script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/hotel/guest-content.js' />"></script>
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.base" var="COL" />
    </jsp:attribute>
    <jsp:body>
        <ax:split-panel width="*">
            <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                <div class="left">
                    <h3><i class="cqc-list"></i>투숙객 목록 </h3>
                </div>
            </div>
            <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 200px;"></div>
        </ax:split-panel>
            <ax:split-panel width="*" style="padding-top: 5px;">
                <div data-fit-height-aside="form-view-01">
                    <form name="form" class="js-form">
                        <div data-ax-tbl class="ax-form-tbl">
                            <input type="hidden" name="id" data-ax-path="id" class="form-control" readonly>
                            <div data-ax-tr>
                                <div data-ax-td style="width:40%">
                                    <div data-ax-td-label style="width:100px">이름</div>
                                    <div data-ax-td-wrap>
                                        <input type="text" name="guestNm" data-ax-path="guestNm" class="form-control">
                                    </div>
                                </div>
                                <div data-ax-td style="width:40%">
                                    <div data-ax-td-label style="width:100px">영문</div>
                                    <div data-ax-td-wrap>
                                        <input type="text" name="guestNmEng" data-ax-path="guestNmEng" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div data-ax-tr>
                                <div data-ax-td style="width:40%">
                                    <div data-ax-td-label style="width:100px">연락처</div>
                                    <div data-ax-td-wrap>
                                        <input type="text" name="guestTel" data-ax-path="guestTel" class="form-control"  data-ax5formatter="phone">
                                    </div>
                                </div>
                                <div data-ax-td style="width:40%">
                                    <div data-ax-td-label style="width:100px">이메일</div>
                                    <div data-ax-td-wrap>
                                        <input type="text" name="email" data-ax-path="email" class="form-control" placeholder="x@x.xx">
                                    </div>
                                </div>
                            </div>
                            <div data-ax-tr>
                                <div data-ax-td style="width:40%">
                                    <div data-ax-td-label style="width:100px">언어</div>
                                    <div data-ax-td-wrap>
                                        <ax:common-code groupCd="PMS_LANG" dataPath="langCd" clazz="js-langCd" />
                                    </div>
                                </div>
                                <div data-ax-td style="width:60%">
                                    <div data-ax-td-label style="width:100px">생년월일</div>
                                    <div data-ax-td-wrap>
                                        <!-- <div data-ax-td style="width:70%"> -->
                                        <div class="form-inline">
                                            <div class="input-group" data-ax5picker="date">
                                                <input type="text" class="form-control js-brth" data-ax-path="brth" placeholder="YYYY-MM-DD">
                                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                            </div>
                                        <!-- </div>  -->
                                        <!-- <div data-ax-td style="width:30%"> -->
                                            <!-- <div data-ax-td-wrap> -->
                                                <ax:common-code groupCd="SEX_TYPE" type="radio" dataPath="gender" clazz="js-gender" />
                                            <!-- </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-ax-tr>
                                <div data-ax-td style="width:100%">
                                    <div data-ax-td-label style="width:100px">비고</div>
                                    <div data-ax-td-wrap>
                                        <textarea name="rmk" data-ax-path="rmk" rows="5" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ax:split-panel>
            <div class="button-warp"  style="text-align: center; padding-top: 10px;">
                <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
                <button type="button" class="btn btn-fn1" data-page-btn="choice"><ax:lang id="ax.admin.sample.modal.button.choice"/></button>
            </div>
    </jsp:body>
</ax:layout>