<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.base" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/hotel/reservation.js' />"></script>
    </jsp:attribute>
        
    <jsp:body>

        <!-- 상단 버튼 -->
        <div data-page-buttons="">
            <div class="button-warp">
                <span style="color:red;">*</span>표시는 필수 항목 체크 부분 
                <button type="button" class="btn btn-info" data-page-btn="save"><i class="cqc-save"></i> 저장</button>  
            </div>
        </div>
        <!-- 하단 form -->
        <div role="page-header" style="overflow: scroll; width:*; height:500px;">
            <form name="form" class="js-form" onsubmit="return false;">
                <div>
                    <h3><span class="js-rsvNum"></span></h3>
                </div>
                <ax:tbl clazz="ax-form-tbl">
                    <div>
                        <input type="hidden" name="id" data-ax-path="id" class="js-id" />
                        <input type="hidden" name="guestId" data-ax-path="guestId" class="js-guestId" />
                        <input type="hidden" name="rmk" data-ax-path="rmk" class="js-rmk" />
                    </div>
                    <div data-ax-tr>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;"><span style="color:red;">*</span>도착일</div>
                                <div data-ax-td-wrap>
                                    <div class="input-group" data-ax5picker="date">
                                        <input type="text" class="form-control js-arrDt" data-ax-path="arrDt" placeholder="YYYY-MM-DD">
                                        <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                    </div>
                                </div>
                        </div>
                        <div data-ax-td style="width:30%">
                            <div data-ax-td-label style="width:120px;"><span style="color:red;">*</span>숙박수</div>
                            <div data-ax-td-wrap>
                            <input type="number" data-ax-path="nightCnt" class="form-control js-nightCnt"  />
                            </div>
                        </div>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;"><span style="color:red;">*</span>출발일</div>
                            <div data-ax-td-wrap>
                            <!-- <input type="date" data-ax-path="depDt" class="form-control js-depDt"  /> -->
                                <div class="input-group" data-ax5picker="date">
                                    <input type="text" class="form-control js-depDt" data-ax-path="depDt" placeholder="YYYY-MM-DD">
                                    <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </>

                    <div data-ax-tr>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;"><span style="color:red;">*</span>객실타입</div>
                            <div data-ax-td-wrap>
                                <ax:common-code groupCd="ROOM_TYPE" dataPath="roomTypCd" clazz="js-roomTypCd" />
                            </div>
                        </div>
                        <div data-ax-td style="width:30%">
                            <div data-ax-td-label style="width:120px;"><span style="color:red;">*</span>성인수</div>
                            <div data-ax-td-wrap>
                            <input type="number" data-ax-path="adultCnt" class="form-control" min=1 />
                            </div>
                        </div>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;"><span style="color:red;">*</span>아동수</div>
                            <div data-ax-td-wrap>
                            <input type="number" data-ax-path="chldCnt" class="form-control" min=0 />
                            </div>
                        </div>
                    </div>

                    <div data-ax-tr>
                        <div data-ax-td style="width:100%">
                            <div data-ax-td-label style="width:120px;">투숙객
                                <div class="ax-button-group">
                                    <button type="button" class="btn btn-default" data-grid-view-01-btn="search"><i class="cqc-magnifier"></i> 검색</button>
                                </div>
                            </div>
                            <div data-ax-td-wrap>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">이름</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" data-ax-path="guestNm" class="form-control js-guestNm" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">영문</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" data-ax-path="guestNmEng" class="form-control js-guestNmEng" />
                                        </div>
                                    </div>                                                                      
                                </div>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">연락처</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" data-ax-path="guestTel" data-ax5formatter="phone" class="form-control js-guestTel" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">이메일</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" data-ax-path="email" class="form-control js-email" />
                                        </div>
                                    </div>                                                                      
                                </div>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">언어</div>
                                        <div data-ax-td-wrap>
                                            <ax:common-code groupCd="PMS_LANG" dataPath="langCd" clazz="js-lang" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">생년월일</div>
                                        <div data-ax-td-wrap>
                                            <!-- <div data-ax-tr> -->
                                                <!-- <div data-ax-td style="width:70%"> -->
                                                <div class="form-inline">
                                                    <!-- <div data-ax-td-wrap> -->
                                                        <div class="input-group" data-ax5picker="date">
                                                            <input type="text" class="form-control js-brth" data-ax-path="brth" placeholder="YYYY-MM-DD">
                                                            <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                                        </div>
                                                    <!-- </div> -->
                                                <!-- </div>  -->
                                                <!-- <div data-ax-td style="width:30%"> -->
                                                    <!-- <div data-ax-td-wrap> -->
                                                        <ax:common-code groupCd="SEX_TYPE" type="radio" dataPath="gender" clazz="js-gender" />
                                                    <!-- </div> -->
                                                <!-- </div> -->
                                                <!-- </div> -->
                                            <!-- </div> -->
                                        </div>
                                    </div>                                                                      
                                </div>                                
                            </div>
                        </div>
                    </div>

                    <div data-ax-tr>
                        <div data-ax-td style="width:100%">
                            <div data-ax-td-label style="width:120px;">판매/결제</div>
                            <div data-ax-td-wrap>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">판매유형</div>
                                        <div data-ax-td-wrap>
                                            <ax:common-code groupCd="PMS_SALE_TYPE" dataPath="saleTypCd" clazz="js-saleType" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">예약경로</div>
                                        <div data-ax-td-wrap>
                                            <ax:common-code groupCd="PMS_RESERVATION_ROUTE" dataPath="srcCd" clazz="js-reservationRoute" />
                                        </div>
                                    </div>                                                                      
                                </div>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">결제방법</div>
                                        <div data-ax-td-wrap>
                                            <ax:common-code groupCd="PMS_PAY_METHOD" dataPath="payCd" clazz="js-payMethod" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">선수금여부</div>
                                        <div data-ax-td-wrap>
                                            <!-- value 값 추가하여 checkYn 넣기는 하였으나 문제 시 삭제할 것 -->
                                            <input type="checkbox" class="form-control js-advnYn" dataPath="advnYn" value="Y" checked/>
                                        </div>
                                    </div>                                                                      
                                </div>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">결제금액</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" data-ax-path="salePrc" data-ax5formatter="money" class="form-control js-salePrc" />
                                            <!-- <input type="text" data-ax-path="salePrc" class="form-control js-salePrc" /> -->
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">서비스금액</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" data-ax-path="svcPrc" data-ax5formatter="money" class="form-control js-svcPrc" />
                                        </div>
                                    </div>                                                                      
                                </div>                                
                            </div>
                        </div>
                    </div>

                    <div data-ax-tr>
                        <div data-ax-td style="width:100%">
                            <div data-ax-td-label style="width:120px;">투숙메모</div>
                            
                                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                                    <div class="left">
                                        <h3><i class="cqc-list"></i> 투숙메모 </h3>
                                    </div>
                                    <div class="right">
                                        <button type="button" class="btn btn-default" data-grid-view-01-btn="add"><i class="cqc-circle-with-plus"></i> 추가</button>
                                        <button type="button" class="btn btn-default" data-grid-view-01-btn="delete"><i class="cqc-circle-with-plus"></i> 삭제</button>
                                    </div>
                                </div>
                                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 120px;"></div>
                            </div>
                        </div>
                    </div>
                </ax:tbl>
            </form>
        </div>
            <div class="button-warp"  style="text-align: center; padding-top: 10px;">
                <button type="button" class="btn btn-fn1" data-page-btn="save">저장</button>
                <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
            </div>
    </jsp:body>
</ax:layout>