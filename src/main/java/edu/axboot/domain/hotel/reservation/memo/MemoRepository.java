package edu.axboot.domain.hotel.reservation.memo;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoRepository extends AXBootJPAQueryDSLRepository<Memo, Long> {
}
