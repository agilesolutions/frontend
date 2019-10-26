package com.agilesolutions.boot.repository;

import org.springframework.data.repository.CrudRepository;

import com.agilesolutions.boot.model.Owner;

public interface OwnerRepository extends CrudRepository<Owner, Long> {

}
