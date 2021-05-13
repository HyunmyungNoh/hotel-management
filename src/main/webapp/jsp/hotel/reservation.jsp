<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <script type="text/javascript" src="<c:url value='/assets/js/view/hotel/reservation.js' />"></script>
    </jsp:attribute>
    
    <jsp:body>

        <!-- 상단 버튼 -->
        <div data-page-buttons="">
            <div class="button-warp">
                * 표시는 필수 항목 체크 부분 
                <button type="button" class="btn btn-info" data-page-btn="save"><i class="cqc-save"></i> 저장</button>
                <button type="button" class="btn btn-fn1" data-page-btn="fn1"><i class="cqc-circular-graph"></i> 신규 등록</button>    
            </div>
        </div>

        <!-- 하단 form -->
        <div role="page-header">
            <form name="form" class="js-form" onsubmit="return false;">
                <ax:tbl clazz="ax-form-tbl">
                    <div data-ax-tr>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;">도착일</div>
                            <div data-ax-td-wrap>
                            <input type="date" name="ceo" data-ax-path="ceo" class="form-control"  />
                            </div>
                        </div>
                        <div data-ax-td style="width:30%">
                            <div data-ax-td-label style="width:120px;">숙박수</div>
                            <div data-ax-td-wrap>
                            <input type="text" name="ceo" data-ax-path="ceo" class="form-control"  />
                            </div>
                        </div>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;">출발일</div>
                            <div data-ax-td-wrap>
                            <input type="date" name="ceo" data-ax-path="ceo" class="form-control"  />
                            </div>
                        </div>
                    </div>

                    <div data-ax-tr>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;">객실타입</div>
                            <div data-ax-td-wrap>
                                <ax:common-code groupCd="ROOM_TYPE" dataPath="roomTypCd" clazz="js-roomTypCd" />
                            </div>
                        </div>
                        <div data-ax-td style="width:30%">
                            <div data-ax-td-label style="width:120px;">성인수</div>
                            <div data-ax-td-wrap>
                            <input type="text" name="ceo" data-ax-path="ceo" class="form-control"  />
                            </div>
                        </div>
                        <div data-ax-td style="width:35%">
                            <div data-ax-td-label style="width:120px;">아동수</div>
                            <div data-ax-td-wrap>
                            <input type="text" name="ceo" data-ax-path="ceo" class="form-control"  />
                            </div>
                        </div>
                    </div>

                    <div data-ax-tr>
                        <div data-ax-td style="width:100%">
                            <div data-ax-td-label style="width:120px;">투숙객
                                <div class="ax-button-group">
                                    <button type="button" class="btn btn-default" data-grid-view-01-btn="add"><i class="cqc-magnifier"></i> 검색</button>
                                </div>
                            </div>
                            <div data-ax-td-wrap>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">이름</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">영문</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>                                                                      
                                </div>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">연락처</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">이메일</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>                                                                      
                                </div>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">언어</div>
                                        <div data-ax-td-wrap>
                                            <ax:common-code groupCd="PMS_LANG" dataPath="lang" clazz="js-lang" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">생년월일</div>
                                        <div data-ax-td-wrap>
                                            <!-- <div data-ax-tr> -->
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
                                            <input type="checkbox" class="form-control js-advnYn" dataPath="advnYn" />
                                        </div>
                                    </div>                                                                      
                                </div>
                                <div data-ax-tr>
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">결제금액</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div> 
                                    <div data-ax-td style="width:50%">
                                        <div data-ax-td-label style="width:120px">서비스금액</div>
                                        <div data-ax-td-wrap>
                                            <input type="text" class="form-control" />
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
                                        <h2><i class="cqc-list"></i> 투숙메모 </h2>
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

    </jsp:body>
</ax:layout>