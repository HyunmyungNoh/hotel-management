package edu.axboot.domain.hotel.guest;

import com.chequer.axboot.core.annotations.Comment;
import edu.axboot.domain.BaseJpaModel;
import edu.axboot.domain.hotel.reservation.Reservation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;


@Getter
@NoArgsConstructor
@Entity
@Table(name = "PMS_GUEST")
public class Guest extends BaseJpaModel<Long> {

	@Id
	@Column(name = "ID", precision = 19, nullable = false)
	@Comment(value = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "GUEST_NM", length = 100, nullable = false)
	@Comment(value = "투숙객 명")
	private String guestNm;

	@Column(name = "GUEST_NM_ENG", length = 100)
	@Comment(value = "투숙객 명 영어")
	private String guestNmEng;

	@Column(name = "GUEST_TEL", length = 18)
	@Comment(value = "투숙객 전화")
	private String guestTel;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "이메일")
	private String email;

	@Column(name = "BRTH", length = 10)
	@Comment(value = "생일")
	private String brth;

	@Column(name = "GENDER", length = 20)
	@Comment(value = "성별")
	private String gender;

	@Column(name = "LANG_CD", length = 20)
	@Comment(value = "언어 CD")
	private String langCd;

	@Column(name = "RMK", length = 500)
	@Comment(value = "비고")
	private String rmk;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name = "GUEST_ID", referencedColumnName = "ID", insertable = false)
	private List<Reservation> reserveList;

    @Override
    public Long getId() {
        return id;
    }

    @Builder
	public Guest(Long id, String guestNm, String guestNmEng, String guestTel, String email,
				 String brth, String gender, String langCd, String rmk) {
		this.id = id;
		this.guestNm = guestNm;
		this.guestNmEng = guestNmEng;
		this.guestTel = guestTel;
		this.email = email;
		this.brth = brth;
		this.gender = gender;
		this.langCd = langCd;
		this.rmk = rmk;
	}

	public void update(String nm, String guestNm, String guestNmEng, String guestTel, String email,
					   String brth, String gender, String langCd, String rmk) {
		this.guestNm = guestNm;
		this.guestNmEng = guestNmEng;
		this.guestTel = guestTel;
		this.email = email;
		this.brth = brth;
		this.gender = gender;
		this.langCd = langCd;
		this.rmk = rmk;
	}

}