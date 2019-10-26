package ch.agilesolutions.boot.repository;

import org.springframework.data.repository.CrudRepository;

import ch.agilesolutions.boot.model.Owner;

public interface OwnerRepository extends CrudRepository<Owner, Long> {

}
