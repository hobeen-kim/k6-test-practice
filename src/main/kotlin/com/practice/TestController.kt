package com.practice

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/test")
class TestController(
    private val userRepository: UserRepository
) {

    @GetMapping
    fun getUsers(): List<Customer> {
        return userRepository.findAll()
    }

    @PostMapping
    fun createRandomUser(@RequestBody userDto: UserDto): Customer {

        return userRepository.save(
            Customer(
                name = userDto.name
            )
        )
    }

}