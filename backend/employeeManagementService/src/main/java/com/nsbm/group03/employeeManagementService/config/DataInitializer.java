package com.nsbm.group03.employeeManagementService.config;

import com.nsbm.group03.employeeManagementService.entity.Employee;
import com.nsbm.group03.employeeManagementService.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if database is already initialized
        if (employeeRepository.count() > 0) {
            logger.info("Database already contains data. Skipping initialization.");
            return;
        }
        
        logger.info("Initializing database with sample employee data...");
        
        List<Employee> employees = Arrays.asList(
            // Front Desk Department
            new Employee("John", "Smith", "john.smith@hotel.com", "1234567890",
                "Front Desk Manager", "FRONT_DESK", 55000.0, 
                LocalDate.of(2022, 1, 15), "ACTIVE", "123 Main St, City"),
            
            new Employee("Sarah", "Johnson", "sarah.johnson@hotel.com", "1234567891",
                "Receptionist", "FRONT_DESK", 35000.0, 
                LocalDate.of(2023, 3, 20), "ACTIVE", "456 Oak Ave, City"),
            
            new Employee("Michael", "Brown", "michael.brown@hotel.com", "1234567892",
                "Receptionist", "FRONT_DESK", 34000.0, 
                LocalDate.of(2023, 6, 10), "ACTIVE", "789 Pine St, City"),
            
            // Housekeeping Department
            new Employee("Emily", "Davis", "emily.davis@hotel.com", "1234567893",
                "Housekeeping Manager", "HOUSEKEEPING", 48000.0, 
                LocalDate.of(2021, 5, 1), "ACTIVE", "321 Elm St, City"),
            
            new Employee("David", "Wilson", "david.wilson@hotel.com", "1234567894",
                "Housekeeper", "HOUSEKEEPING", 32000.0, 
                LocalDate.of(2023, 2, 14), "ACTIVE", "654 Maple Dr, City"),
            
            new Employee("Lisa", "Martinez", "lisa.martinez@hotel.com", "1234567895",
                "Housekeeper", "HOUSEKEEPING", 31000.0, 
                LocalDate.of(2023, 7, 22), "ON_LEAVE", "987 Cedar Ln, City"),
            
            // Kitchen Department
            new Employee("James", "Anderson", "james.anderson@hotel.com", "1234567896",
                "Head Chef", "KITCHEN", 65000.0, 
                LocalDate.of(2020, 9, 1), "ACTIVE", "147 Birch Rd, City"),
            
            new Employee("Maria", "Garcia", "maria.garcia@hotel.com", "1234567897",
                "Sous Chef", "KITCHEN", 52000.0, 
                LocalDate.of(2021, 11, 15), "ACTIVE", "258 Spruce Ave, City"),
            
            new Employee("Robert", "Lee", "robert.lee@hotel.com", "1234567898",
                "Line Cook", "KITCHEN", 38000.0, 
                LocalDate.of(2022, 4, 10), "ACTIVE", "369 Willow St, City"),
            
            new Employee("Jennifer", "Taylor", "jennifer.taylor@hotel.com", "1234567899",
                "Pastry Chef", "KITCHEN", 45000.0, 
                LocalDate.of(2022, 8, 5), "ACTIVE", "741 Ash Blvd, City"),
            
            // Restaurant Department
            new Employee("William", "Thomas", "william.thomas@hotel.com", "1234567800",
                "Restaurant Manager", "RESTAURANT", 58000.0, 
                LocalDate.of(2021, 3, 1), "ACTIVE", "852 Cherry Ln, City"),
            
            new Employee("Jessica", "White", "jessica.white@hotel.com", "1234567801",
                "Waiter", "RESTAURANT", 30000.0, 
                LocalDate.of(2023, 1, 20), "ACTIVE", "963 Poplar Dr, City"),
            
            new Employee("Christopher", "Harris", "christopher.harris@hotel.com", "1234567802",
                "Waiter", "RESTAURANT", 29000.0, 
                LocalDate.of(2023, 5, 15), "ACTIVE", "159 Hickory St, City"),
            
            // Maintenance Department
            new Employee("Daniel", "Clark", "daniel.clark@hotel.com", "1234567803",
                "Maintenance Manager", "MAINTENANCE", 52000.0, 
                LocalDate.of(2020, 7, 1), "ACTIVE", "357 Walnut Ave, City"),
            
            new Employee("Amanda", "Lewis", "amanda.lewis@hotel.com", "1234567804",
                "Maintenance Technician", "MAINTENANCE", 40000.0, 
                LocalDate.of(2022, 10, 20), "ACTIVE", "486 Beech Rd, City"),
            
            // Management
            new Employee("Thomas", "Walker", "thomas.walker@hotel.com", "1234567805",
                "General Manager", "MANAGEMENT", 85000.0, 
                LocalDate.of(2019, 1, 1), "ACTIVE", "579 Sycamore Blvd, City"),
            
            new Employee("Patricia", "Hall", "patricia.hall@hotel.com", "1234567806",
                "HR Manager", "MANAGEMENT", 62000.0, 
                LocalDate.of(2020, 3, 15), "ACTIVE", "681 Magnolia Dr, City"),
            
            new Employee("Richard", "Allen", "richard.allen@hotel.com", "1234567807",
                "Finance Manager", "MANAGEMENT", 68000.0, 
                LocalDate.of(2020, 6, 1), "ACTIVE", "792 Dogwood St, City"),
            
            // Security Department
            new Employee("Linda", "Young", "linda.young@hotel.com", "1234567808",
                "Security Manager", "SECURITY", 50000.0, 
                LocalDate.of(2021, 2, 1), "ACTIVE", "804 Redwood Ave, City"),
            
            new Employee("Joseph", "King", "joseph.king@hotel.com", "1234567809",
                "Security Guard", "SECURITY", 36000.0, 
                LocalDate.of(2022, 12, 10), "ACTIVE", "915 Fir Ln, City")
        );
        
        employeeRepository.saveAll(employees);
        logger.info("Successfully initialized database with {} employees", employees.size());
    }
}
