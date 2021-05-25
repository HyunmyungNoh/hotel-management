package edu.axboot.controllers.reservedto;

import com.fasterxml.jackson.annotation.JsonFormat;
import edu.axboot.domain.hotel.reservation.memo.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class MemoSaveRequestDto {
    private Long id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private Timestamp memoDtti;
    private String memoCn;
    private boolean __created__;
    private boolean __modified__;
    private boolean __deleted__;

    @Builder
    public MemoSaveRequestDto(Long id, Timestamp memoDtti, String memoCn,
                              boolean __created__, boolean __modified__, boolean __deleted__) {
        this.id = id;
        this.memoDtti = memoDtti;
        this.memoCn = memoCn;
        this.__created__ = __created__;
        this.__modified__ = __modified__;
        this.__deleted__ = __deleted__;
    }

    public Memo toEntity() {
        return Memo.builder()
                .id(id)
                .memoDtti(memoDtti)
                .memoCn(memoCn)
                .isCreated(__created__)
                .isModified(__modified__)
                .isDeleted(__deleted__)
                .build();
    }
}
