package com.agilesolutions.boot.controller;

import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agilesolutions.boot.model.Car;
import com.agilesolutions.boot.repository.CarRepository;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 
 * @author u24279
 *
 */
@RestController
@RequestMapping("/api")
public class CarController {

	@Autowired
	private CarRepository repository;

	private static final Logger logger = LoggerFactory.getLogger(CarController.class);
	
	@Value("${backend.url}")
	private String endpoint;

	@GetMapping("/cars")
	@ApiOperation(value = "List cars", notes = "List all available cars")
	public  ResponseEntity<Iterable<Car>>  getCars(@NotNull Authentication auth) {

		ResponseEntity<List<Car>> response = null;
		try {
			logger.info("Fetching cars",  kv("type", "ATL"));
			
			return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
			
		} catch (Exception e) {
			logger.error("Error fetching cars with {}", e.getMessage(),  kv("type", "EXL"));
			
			return new ResponseEntity<>(null, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@ApiOperation(value = "Add new Cars")
	@PostMapping("/cars")
	public ResponseEntity<Car> addCar(@ApiParam(value = "Add new Car") @RequestBody Car car) {
		
		logger.info("Adding vehicle {}", car.getBrand(),  kv("type", "SAL"));


		try {
			return  new ResponseEntity<Car>(repository.save(car),HttpStatus.OK);      
		} catch (Exception e) {
			logger.error("Exceptin while adding vehicle {}", car.getBrand(),  kv("type", "EXL"));
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);  
		}

	}

	@ApiOperation(value = "Remove car")
	@DeleteMapping("/cars/{id}")
	public ResponseEntity<String> deleteCar(@ApiParam(value = "Car identifier") @PathVariable Long id) {

		logger.info("Removing vehicle with id {}", id,  kv("type", "SAL"));
		
		try {
			repository.deleteById(id);
			
			return  new ResponseEntity<String>("Car removed successfully",HttpStatus.OK);      
		} catch (Exception e) {
			logger.error("Excpeption occured while removing vehicle with id {}", id,  kv("type", "EXL"));
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);  
		}

		
		
	}

	// Single item

	@GetMapping("/cars/{id}")
	public ResponseEntity<Car> fetchCar(@PathVariable Long id) {
		
		logger.info("fetching vehicle with id {}", id,  kv("type", "ATL"));
		
		try {
			return  new ResponseEntity<Car>(repository.findById(id).get(),HttpStatus.OK);      
		} catch (Exception e) {
			logger.info("Exceptin while fetching vehicle with id {}", id,  kv("type", "SAL"));
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);  
		}
	}

}
