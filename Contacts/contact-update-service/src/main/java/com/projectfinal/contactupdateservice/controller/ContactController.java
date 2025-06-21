package com.projectfinal.contactupdateservice.controller;

import com.projectfinal.contactupdateservice.model.Contact;
import com.projectfinal.contactupdateservice.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable String id, @RequestBody Contact contact) {
        Contact updated = contactService.updateContact(id, contact);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContact(@PathVariable String id) {
        return contactService.getContactById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
