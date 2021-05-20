package edu.axboot.controllers;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.utils.DateUtils;
import com.chequer.axboot.core.utils.ExcelUtils;
import com.wordnik.swagger.annotations.ApiOperation;
import edu.axboot.controllers.guestdto.GuestListResponseDto;
import edu.axboot.controllers.guestdto.GuestResponseDto;
import edu.axboot.controllers.guestdto.GuestSaveRequestDto;
import edu.axboot.domain.hotel.guest.GuestService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RequiredArgsConstructor
/*@Controller
@RequestMapping(value = "/api/v1/guest")*/
@RestController
public class GuestController extends BaseController {
    private static final Logger logger = LoggerFactory.getLogger(GuestController.class);

    //    @Inject
    private final GuestService guestService;

    /*@RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<Guest> requestParams) {
        List<Guest> list = guestService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Guest> request) {
        guestService.save(request);
        return ok();
    }*/

    @GetMapping("/api/v1/guest")
    public Responses.ListResponse list(@RequestParam(value = "guestNm", required = false) String guestNm,
                                       @RequestParam(value = "guestTel", required = false) String guestTel,
                                       @RequestParam(value = "email", required = false) String email) {
        List<GuestListResponseDto> list = guestService.findBy(guestNm, guestTel, email);
        return Responses.ListResponse.of(list);
    }

    @GetMapping("/api/v1/guest/{id}")
    public GuestResponseDto findById(@PathVariable Long id) {
        return guestService.findById(id);
    }

    @PostMapping("/api/v1/guest")
    public ApiResponse save(@RequestBody GuestSaveRequestDto requestDto) {
        guestService.save(requestDto);
        return ok();
    }

    @PutMapping("/api/v1/guest")
    public ApiResponse update(@RequestBody GuestSaveRequestDto requestDto) {
        guestService.update(requestDto);
        return ok();
    }

    // 엑셀 다운로드
    @ApiOperation(value = "엑셀다운로드", notes = "/resources/excel/pms_guest.xlsx")
    @PostMapping("/api/v1/guest/exceldown")
    public void excelDown(@RequestParam(value = "guestNm", required = false) String guestNm,
                          @RequestParam(value = "guestTel", required = false) String guestTel,
                          @RequestParam(value = "email", required = false) String email,
                          HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<GuestListResponseDto> list = guestService.findBy(guestNm, guestTel, email);
        ExcelUtils.renderExcel("/excel/pms_guest.xlsx", list, "Guest_" + DateUtils.getYyyyMMddHHmmssWithDate(), request, response);
    }

}