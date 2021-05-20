package edu.axboot.domain.hotel.guest;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestRepository extends AXBootJPAQueryDSLRepository<Guest, Long> {
}
