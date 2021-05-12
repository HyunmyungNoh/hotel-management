package edu.axboot.domain.hotel.room;

import edu.axboot.AXBootApplication;
import lombok.extern.java.Log;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.junit.Assert.assertTrue;

@Log
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AXBootApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class RoomServiceTest {
    @Autowired
    private RoomService roomService;

    public static long testId = 0;

//    @Test
//    public void test1_거래처_저장() {
//        //given
//        List<Room> roomList = new ArrayList<Room>();
//
//        Room room = new Room().builder()
//                .roomNum("101")
//                .roomTypCd("DT")
//                .dndYn("Y")
//                .ebYn("N")
//                .roomSttusCd("EMT")
//                .clnSttusCd("VC")
//                .svcSttusCd("OOS")
//                .build();
//
//        roomList.add(room);
////        room.set__created__(true);
//
//        //when
//        for (Room entity: roomList) {
//            testId = roomService.save(entity).getId();
//        }
//        //then
//        assertTrue(testId > 0);
//    }

    @Test
    public void test2_거래처_조회() {
        //given
        String roomTypCd = "DT";

        //when
        List<Room> roomList = roomService.getRoomList(roomTypCd);

        //then
        assertTrue(roomList.size()>0);
    }
}
