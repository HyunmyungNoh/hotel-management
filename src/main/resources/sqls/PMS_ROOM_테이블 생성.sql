-- 객실
CREATE TABLE PMS_ROOM (
   ID            BIGINT       NOT NULL COMMENT 'ID', -- ID
   ROOM_NUM      VARCHAR(10)  NOT NULL DEFAULT '' COMMENT '객실 번호', -- 객실 번호
   ROOM_TYP_CD   VARCHAR(20)  NOT NULL COMMENT '객실 타입 CD', -- 객실 타입 CD
   DND_YN        VARCHAR(1)   NOT NULL DEFAULT 'N' COMMENT 'DND 여부', -- DND 여부
   EB_YN         VARCHAR(1)   NOT NULL DEFAULT 'N' COMMENT 'EB 여부', -- EB 여부
   ROOM_STTUS_CD VARCHAR(20)  NULL     COMMENT '객실 상태 CD', -- 객실 상태 CD
   CLN_STTUS_CD  VARCHAR(20)  NULL     COMMENT '청소 상태 CD', -- 청소 상태 CD
   SVC_STTUS_CD  VARCHAR(20)  NULL     COMMENT '서비스 상태 CD', -- 서비스 상태 CD
   CREATED_AT    TIMESTAMP    NULL     COMMENT '등록일', -- 등록일
   CREATED_BY    VARCHAR(100) NULL     COMMENT '등록자', -- 등록자
   UPDATED_AT    TIMESTAMP    NULL COMMENT '변경일', -- 변경일
   UPDATED_BY    VARCHAR(100) NULL COMMENT '변경자' -- 변경자
);
-- 객실 유니크 인덱스
CREATE UNIQUE INDEX UIX_PMS_ROOM
   ON PMS_ROOM ( -- 객실
      ID ASC -- ID
   );
-- 객실 유니크 인덱스2
CREATE UNIQUE INDEX UIX_PMS_ROOM2
   ON PMS_ROOM ( -- 객실
      ROOM_NUM ASC -- 객실 번호
   );
ALTER TABLE PMS_ROOM
   MODIFY COLUMN ID BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID';