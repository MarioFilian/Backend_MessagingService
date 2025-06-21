package com.projectfinal.contactupdateservice.repository;

import com.projectfinal.contactupdateservice.model.Contact;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ContactRepository extends Neo4jRepository<Contact, String> {
}
