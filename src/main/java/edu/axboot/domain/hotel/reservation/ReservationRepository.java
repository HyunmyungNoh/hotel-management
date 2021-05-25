package edu.axboot.domain.hotel.reservation;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends AXBootJPAQueryDSLRepository<Reservation, Long> {
}
