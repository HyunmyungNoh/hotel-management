<%@ page import="com.chequer.axboot.core.api.Api" %>
<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>

<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<%
    String uuid = java.util.UUID.randomUUID().toString().replaceAll("-","");
    RequestUtils requestUtils = RequestUtils.of(request);
    requestUtils.setAttribute("UUID", uuid);
%>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/ax5ui/ax5ui-uploader/master/dist/ax5uploader.css" />
    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.base" var="COL" />
        <script type="text/javascript" src="https://cdn.rawgit.com/ax5ui/ax5ui-uploader/master/dist/ax5uploader.js"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins-fix/ckeditor/ckeditor.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/hotel/guest-info.js' />"></script>
    </jsp:attribute>

    <jsp:attribute name="js">
        <script type="text/javascript">
            var UUID = "${UUID}";
        </script>
    </jsp:attribute>
    <jsp:attribute name="css">
        <style type="text/css">
            /*.editor1{width:100%; border:1px solid #D7D7D7; border-radius: 3px; overflow: hidden; background: white;}*/
        </style>
    </jsp:attribute>

    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='이름' width="300px">
                            <input type="text" name ="guestNm" class="js-guestNm form-control" />
                        </ax:td>
                        <ax:td label='전화번호' width="300px">
                            <input type="text" name ="guestTel" class="js-guestTel form-control" />
                        </ax:td>
                        <ax:td label='이메일' width="300px">
                            <input type="text" name ="email" class="js-guestEmail form-control" />
                        </ax:td>
                    </ax:tr>
                    <ax:tr>
                        <ax:td label='투숙날짜' width="100%">
                            <div class="form-group" data-ax5picker="date">
                                <div data-ax-td-wrap>
                                    <div class="ax-button-group">
                                        <div class="left">
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="today"> 오늘</button>
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="yesterday"> 어제</button>
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="3days"> 3일</button>
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="7days"> 7일</button>
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="1month"> 1개월</button>
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="3month"> 3개월</button>
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="6month"> 6개월</button>
                                            <button type="button" class="btn btn-default" data-grid-view-01-btn="year"> 1년</button>
                                        </div>
                                        <div class="right">
                                            <div class="input-group" data-ax5picker="basic">
                                                <input type="date" name="ceo" data-ax-path="ceo" class="form-control" placeholder="yyyy/mm/dd"/> 
                                                <span class="input-group-addon">~</span>
                                                <input type="date" name="ceo" data-ax-path="ceo" class="form-control" placeholder="yyyy/mm/dd"/> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="400" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i> 투숙객 목록 </h2>
                    </div>
                    <div class="right">
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <div data-fit-height-aside="form-view-01">
                    <div class="ax-button-group" role="panel-header">
                        <div class="left">
                            <h2><i class="cqc-pencil"></i> 투숙객 정보 </h2>
                        </div>
                        <div class="right">
                        </div>
                    </div>

                    <form name="form" class="js-form">
                        <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                            <div data-ax-tr>
                                <div data-ax-td style="width:50%">
                                    <div data-ax-td-label style="width:120px;">이름</div>
                                    <div data-ax-td-wrap>
                                        <input type="text" name="ceo" data-ax-path="ceo" class="form-control"  />
                                    </div>
                                </div>
                                <div data-ax-td style="width:50%">
                                    <div data-ax-td-label style="width:120px;">영문</div>
                                    <div data-ax-td-wrap>
                                    <input type="text" name="ceo" data-ax-path="ceo" class="form-control"  />
                                    </div>
                                </div>
                            </div>
                            <div data-ax-tr>
                                <div data-ax-td style="width:50%">
                                    <div data-ax-td-label style="width:120px;">연락처</div>
                                    <div data-ax-td-wrap>
                                        <input type="text" name="ceo" data-ax-path="ceo" class="form-control"  />
                                    </div>
                                </div>
                                <div data-ax-td style="width:50%">
                                    <div data-ax-td-label style="width:120px;">이메일</div>
                                    <div data-ax-td-wrap>
                                        <input type="text" name="ceo" data-ax-path="ceo" class="form-control"  />
                                    </div>
                                </div>
                            </div>
                            <div data-ax-tr>
                                <div data-ax-td style="width:50%">
                                    <div data-ax-td-label style="width:120px;">언어</div>
                                    <div data-ax-td-wrap>
                                        <ax:common-code groupCd="PMS_LANG" dataPath="lang" clazz="js-lang" />
                                    </div>
                                </div>
                                <div data-ax-td style="width:50%">
                                    <div data-ax-td-label style="width:120px;">생년월일</div>
                                    <div data-ax-td-wrap>
                                        <div data-ax-td style="width:70%">
                                            <div data-ax-td-wrap>
                                                <input type="date" class="form-control" />
                                            </div>
                                        </div> 
                                        <div data-ax-td style="width:30%">
                                            <div data-ax-td-wrap>
                                                <ax:common-code groupCd="SEX_TYPE" type="radio" dataPath="sex" clazz="js-sex" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <ax:tr labelWidth="120px">
                                <ax:td label="이름" width="50%">
                                    <input type="text" name="id" data-ax-path="id" class="form-control" readonly="readonly">
                                </ax:td>
                                <ax:td label="영문" width="50%">
                                    <input type="text" name="id" data-ax-path="id" class="form-control" readonly="readonly">
                                </ax:td>
                            </ax:tr> -->

                            

                            <ax:tr labelWidth="120px">
                                <ax:td label="비고" width="100%">
                                    <!-- <textarea name="remark" id="remark" data-ax-path="remark" rows="5" class="form-control"></textarea> -->
                                    <textarea name="editor1" id="editor1" data-ax-path="remark" rows="5" class="form-control"></textarea>
                                </ax:td>
                            </ax:tr>

                            <ax:tr labelWidth="120px">
                                <ax:td label="첨부파일 <i class='icon-info-circled cp'></i>" width="100%">
                                    <div data-ax5uploader="upload1">
                                        <input type="hidden" id="targetType" name="targetType" value="EDUCATION_TEACH" />
                                        <button data-ax5uploader-button="selector" class="btn btn-primary">Select File (*/*)</button>
                                        (Upload Max fileSize 100MB)
                                        <div data-uploaded-box="upload1" data-ax5uploader-uploaded-box="inline"></div>
                                    </div>
                                </ax:td>
                            </ax:tr>

                        </ax:tbl>
                    </form>
                </div>

                <div data-ax5grid="grid-view-02" style="height: 300px;"></div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>