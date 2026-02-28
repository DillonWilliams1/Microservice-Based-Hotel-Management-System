package com.nsbm.group03.reservationManagementService.repository;

import com.nsbm.group03.reservationManagementService.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByGuest_GuestId(Long guestId);

}