package edu.axboot.controllers.reservedto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RsvStatusRequestDto {
    private Long id;
    private String sttusCd;

    @Builder

    public RsvStatusRequestDto(Long id, String sttusCd) {
        this.id = id;
        this.sttusCd = sttusCd;
    }
}
