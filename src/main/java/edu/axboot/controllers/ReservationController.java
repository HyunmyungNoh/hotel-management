package edu.axboot.controllers;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import edu.axboot.controllers.reservedto.RsvSaveRequestDto;
import edu.axboot.domain.hotel.reservation.Reservation;
import edu.axboot.domain.hotel.reservation.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ReservationController extends BaseController {

    /*@Inject
    private ReservationService reservationService;*/

    private final ReservationService reservationService;

/*    @GetMapping("/api/v1/reservation")
    public Responses.ListResponse list(RequestParams<Reservation> requestParams) {
        List<Reservation> list = reservationService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }*/

//    @PostMapping("/api/v1/reservation")
//    public ApiResponse save(@RequestBody List<Reservation> request) {
//        reservationService.save(request);
//        return ok();
//    }

    @PostMapping("/api/v1/reservation")
//    @RequestMapping(method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody RsvSaveRequestDto request) {
        reservationService.save(request);
        return ok();
    }

/*    @PostMapping("/api/v1/reservation/save")
    public ApiResponse reserveSave(@RequestBody ReserveSaveRequestDto requestDto) {
        reservationService.reserveSave(requestDto);
        return ok();
    }*/

}