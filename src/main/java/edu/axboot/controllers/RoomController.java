package edu.axboot.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import edu.axboot.controllers.roomdto.RoomInfoListResponseDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.*;
import edu.axboot.domain.hotel.room.Room;
import edu.axboot.domain.hotel.room.RoomService;

import javax.inject.Inject;
import java.util.List;

//@RequestMapping(value = "/api/v1/room")
//@RequiredArgsConstructor
@RestController
public class RoomController extends BaseController {
//    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);

    @Inject
    private RoomService roomService;

 /*   @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<Room> requestParams) {
        List<Room> list = roomService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Room> request) {
        roomService.save(request);
        return ok();
    }*/

    // Dto를 쓰려고 했지만 의미가 없는 듯 하다
/*    @GetMapping("/api/v1/hotel/roomInfo")
    public Responses.ListResponse findRoomList(@RequestParam(value = "roomTypCd", required = false) String roomTypCd) {
        List<RoomInfoListResponseDto> list = roomService.findRoomList(roomTypCd);
        return Responses.ListResponse.of(list);
    }*/

    @GetMapping("/api/v1/hotel/roomInfo")
    public Responses.ListResponse getRoomList(@RequestParam(value = "roomType", required = false) String roomType) {
        List<Room> list = roomService.getRoomList(roomType);
        return Responses.ListResponse.of(list);
    }

//    @PutMapping("/api/v1/hotel/roomInfo")
    @PostMapping("/api/v1/hotel/roomInfo")
    public ApiResponse saveRoom(@RequestBody List<Room> request) {
        roomService.save(request);
//        roowmService.saveRoom(request);
        return ok();
    }

}