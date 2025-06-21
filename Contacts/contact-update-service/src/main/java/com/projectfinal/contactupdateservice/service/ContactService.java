package com.projectfinal.contactupdateservice.service;

import com.projectfinal.contactupdateservice.model.Contact;
import com.projectfinal.contactupdateservice.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Optional<Contact> getContactById(String id) {
        return contactRepository.findById(id);
    }

    public Contact updateContact(String id, Contact updatedContact) {
        Optional<Contact> existingContactOpt = contactRepository.findById(id);
        if (existingContactOpt.isPresent()) {
            Contact existing = existingContactOpt.get();
            existing.setName(updatedContact.getName());
            existing.setPhone(updatedContact.getPhone());
            return contactRepository.save(existing);
        }
        return null;
    }
}
