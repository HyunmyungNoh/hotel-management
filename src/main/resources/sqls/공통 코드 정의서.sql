-- 초기 데이터 : PMS 사용 공통코드 ########################################
--DELETE FROM COMMON_CODE_M WHERE GROUP_CD LIKE 'PMS_%';
INSERT INTO COMMON_CODE_M (GROUP_CD, GROUP_NM, CODE, NAME, SORT, USE_YN, CREATED_AT, CREATED_BY, UPDATED_AT, UPDATED_BY)
-- 객실정보 - 객실타입
SELECT 'PMS_ROOM_TYPE', '객실타입',  'SB', 'Single Bed', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_ROOM_TYPE', '객실타입',  'DB', 'Double Bed', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_ROOM_TYPE', '객실타입',  'DT', 'Double Twin Bed', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 객실정보 - 객실상태
SELECT 'PMS_ROOM_STATUS', '객실상태',  'EMT', '공실', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_ROOM_STATUS', '객실상태',  'IN', '재실', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_ROOM_STATUS', '객실상태',  'OUT', '외출', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 객실정보 - 청소상태
SELECT 'PMS_CLEAN_STATUS', '청소상태',  'VD', '청소대기', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_CLEAN_STATUS', '청소상태',  'VW', '청소중', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_CLEAN_STATUS', '청소상태',  'VC', '청소완료', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 객실정보 - 서비스상태
SELECT 'PMS_SVC_STATUS', '서비스상태',  'OOO', 'Out Of Order', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_SVC_STATUS', '서비스상태',  'OOS', 'Out Of Service', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 에약등록 - 판매유형
SELECT 'PMS_SALE_TYPE', '판매유형',  '01', '부킹예약', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_SALE_TYPE', '판매유형',  '02', '워크인', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_SALE_TYPE', '판매유형',  '03', '대실', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_SALE_TYPE', '판매유형',  '04', '컴프', 4, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_SALE_TYPE', '판매유형',  '05', '하우스유즈', 5, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 에약등록 - 예약경로
SELECT 'PMS_RESERVATION_ROUTE', '예약경로',  '01', '홈페이지', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_RESERVATION_ROUTE', '예약경로',  '02', '메일', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_RESERVATION_ROUTE', '예약경로',  '03', '전화', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_RESERVATION_ROUTE', '예약경로',  '04', '팩스', 4, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_RESERVATION_ROUTE', '예약경로',  '05', '방문', 5, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_RESERVATION_ROUTE', '예약경로',  '06', '온라인', 6, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_RESERVATION_ROUTE', '예약경로',  '07', '기타', 7, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 에약등록 - 결제방법
SELECT 'PMS_PAY_METHOD', '결제방법',  'CASH', '현금', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_PAY_METHOD', '결제방법',  'CREDIT', '신용카드', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_PAY_METHOD', '결제방법',  'BANK', '계좌이체', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_PAY_METHOD', '결제방법',  'EXTERNAL_POST_PAYMENT', '대외후불', 4, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 에약현황 - 상태
SELECT 'PMS_STAY_STATUS', '투숙상태',  'RSV_01', '얘약', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_STAY_STATUS', '투숙상태',  'RSV_02', '예약대기', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_STAY_STATUS', '투숙상태',  'RSV_03', '예약확정', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_STAY_STATUS', '투숙상태',  'RSV_04', '예약취소', 4, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_STAY_STATUS', '투숙상태',  'RSV_05', '노쇼', 5, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_STAY_STATUS', '투숙상태',  'CHK_01', '체크인', 6, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_STAY_STATUS', '투숙상태',  'CHK_02', '체크아웃', 7, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_STAY_STATUS', '투숙상태',  'CHK_03', '체크인취소', 8, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
-- 투숙객정보 - 언어
SELECT 'PMS_LANG', '언어',  'KO', '한국어', 1, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_LANG', '언어',  'EN', '영어', 2, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_LANG', '언어',  'CH', '중국어', 3, 'Y', sysdate(), 'system', sysdate(), 'system' UNION ALL
SELECT 'PMS_LANG', '언어',  'JP', '일본어', 4, 'Y', sysdate(), 'system', sysdate(), 'system';