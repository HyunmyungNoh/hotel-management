package edu.axboot.controllers;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.chequer.axboot.core.utils.MessageUtils;
import edu.axboot.controllers.reservedto.RsvListResponseDto;
import edu.axboot.controllers.reservedto.RsvResponseDto;
import edu.axboot.controllers.reservedto.RsvSaveRequestDto;
import edu.axboot.domain.hotel.reservation.Reservation;
import edu.axboot.domain.hotel.reservation.ReservationService;
import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.MessageUtil;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ReservationController extends BaseController {
    private final ReservationService reservationService;

    @PostMapping("/api/v1/reservation")
    // 원래는 ApiResponse로 성공 여부만 보냈지만 이번엔 특정 메시지를 실어보내기로 한다.
    public Responses.MapResponse save(@RequestBody RsvSaveRequestDto requestDto, HttpServletRequest request) {
        Long id = reservationService.save(requestDto);
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("rsvNum", id);   // 예약 ID와 메시지를 map에 실어 보낸다.
        map.put("message", MessageUtils.getMessage(request, "ax.script.onsave"));
        return Responses.MapResponse.of(map);
    }

    // id로 예약 정보를 찾아와서 예약 form을 채울 것
    @GetMapping("/api/v1/reservation/{id}")
    public RsvResponseDto findById(@PathVariable Long id) {
        return reservationService.findById(id);
    }

    // 예약 현황에서 그리드에 뿌릴 예약 정보
    @GetMapping("/api/v1/reservation")
    public Responses.ListResponse list(@RequestParam(value = "filter", required = false) String filter,
                                   @RequestParam(value = "rsvNum", required = false) String rsvNum,
                                   @RequestParam(value = "roomTypCd", required = false) String roomTypCd,
                                   @RequestParam(value = "rsvDtStart", required = false) String rsvSttDate,
                                   @RequestParam(value = "rsvDtEnd", required = false) String rsvEndDate,
                                   @RequestParam(value = "arrDtStart", required = false) String arrSttDate,
                                   @RequestParam(value = "arrDtEnd", required = false) String arrEndDate,
                                   @RequestParam(value = "depDtStart", required = false) String depSttDate,
                                   @RequestParam(value = "depDtEnd", required = false) String depEndDate,
                                   @RequestParam(value = "sttusCd", required = false) List<String> sttusCds) {
        List<RsvListResponseDto> list = reservationService.findBy(filter, rsvNum, roomTypCd, rsvSttDate, rsvEndDate, arrSttDate, arrEndDate, depSttDate, depEndDate, sttusCds);
        return Responses.ListResponse.of(list);
    }
/*    @PostMapping("/api/v1/reservation/save")
    public ApiResponse reserveSave(@RequestBody ReserveSaveRequestDto requestDto) {
        reservationService.reserveSave(requestDto);
        return ok();
    }*/

}