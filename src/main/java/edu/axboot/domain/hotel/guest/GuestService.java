package edu.axboot.domain.hotel.guest;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import edu.axboot.controllers.guestdto.GuestListResponseDto;
import edu.axboot.controllers.guestdto.GuestResponseDto;
import edu.axboot.controllers.guestdto.GuestSaveRequestDto;
import edu.axboot.controllers.guestdto.GuestUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import edu.axboot.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GuestService extends BaseService<Guest, Long> {
    private final GuestRepository guestRepository;

    // RequiredArgsConstructor를 썼으므로 여기서는 쓸 필요가 없음
/*    @Inject
    public GuestService(GuestRepository guestRepository) {
        super(guestRepository);
        this.guestRepository = guestRepository;
    }*/

/*    public List<Guest> gets(RequestParams<Guest> requestParams) {
        return findAll();
    }*/

    // 조건에 맞는 게스트들을 찾아 그리드에 그려줄 리스트
    @Transactional(readOnly = true)
    public List<GuestListResponseDto> findBy(String guestNm, String guestTel, String email) {
        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(guestNm)) builder.and(qGuest.guestNm.like("%" + guestNm +"%"));
        if (isNotEmpty(guestTel)) builder.and(qGuest.guestTel.like("%" + guestTel +"%"));
        if (isNotEmpty(email)) builder.and(qGuest.email.like("%" + email +"%"));

        List<Guest> entities = select()
                .select(
                        Projections.fields(
                                Guest.class, qGuest.id, qGuest.guestNm, qGuest.guestTel, qGuest.email,
                                qGuest.gender, qGuest.brth, qGuest.langCd))
                .from(qGuest)
                .where(builder)
                .orderBy(qGuest.guestNm.asc())
                .fetch();

        return entities.stream()
                .map(GuestListResponseDto::new)
                .collect(Collectors.toList());
    }

    // 아이디로 게스트 찾기. findOne 이용
    public GuestResponseDto findById(Long id) {
        Guest guest = guestRepository.findOne(id);
        if (guest == null) throw new IllegalArgumentException("해당 투숙객 정보가 없습니다. id = " + id);
        return new GuestResponseDto(guest);
    }

    // 저장
    @Transactional
    public long save(GuestSaveRequestDto saveDto) {
        return guestRepository.save(saveDto.toEntity()).getId();
    }

    // form에서 가져와서 업데이트
    @Transactional
    public Long update(GuestUpdateRequestDto updateDto) {
        Guest guest = guestRepository.findOne(updateDto.getId());
        if(guest == null) throw new IllegalArgumentException("해당 투숙객 정보가 없습니다. id = " + updateDto.getId());

        // JPA 영속성 컨텍스트 사용 (엔티티를 영구 저장하는 환경)
        guest.update(updateDto.getGuestNm(), updateDto.getGuestNmEng(), updateDto.getGuestTel(), updateDto.getGuestTel(),
                updateDto.getEmail(), updateDto.getBrth(), updateDto.getGender(), updateDto.getLangCd(), updateDto.getRmk());

        return guest.getId();
    }

    // update 2? controller에서 부르는 것은 이것으로 보임
    @Transactional
    public long update(GuestSaveRequestDto saveDto) {
        return guestRepository.save(saveDto.toEntity()).getId();
    }
}