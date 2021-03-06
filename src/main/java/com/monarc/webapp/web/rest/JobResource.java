package com.monarc.webapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.monarc.webapp.domain.Job;
import com.monarc.webapp.repository.JobRepository;
import com.monarc.webapp.web.rest.util.HeaderUtil;
import com.monarc.webapp.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Job.
 */
@RestController
@RequestMapping("/api")
public class JobResource {

    private final Logger log = LoggerFactory.getLogger(JobResource.class);

    @Inject
    private JobRepository jobRepository;

    /**
     * POST  /jobs -> Create a new job.
     */
    @RequestMapping(value = "/jobs",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Job> createJob(@RequestBody Job job) throws URISyntaxException {
        log.debug("REST request to save Job : {}", job);
        if (job.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new job cannot already have an ID").body(null);
        }
        Job result = jobRepository.save(job);
        return ResponseEntity.created(new URI("/api/jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("job", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobs -> Updates an existing job.
     */
    @RequestMapping(value = "/jobs",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Job> updateJob(@RequestBody Job job) throws URISyntaxException {
        log.debug("REST request to update Job : {}", job);
        if (job.getId() == null) {
            return createJob(job);
        }
        Job result = jobRepository.save(job);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("job", job.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobs -> get all the jobs.
     */
    @RequestMapping(value = "/jobs",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Job>> getAllJobs(Pageable pageable)
        throws URISyntaxException {
        Page<Job> page = jobRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/jobs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /jobs/:id -> get the "id" job.
     */
    @RequestMapping(value = "/jobs/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        log.debug("REST request to get Job : {}", id);
        return Optional.ofNullable(jobRepository.findOne(id))
            .map(job -> new ResponseEntity<>(
                job,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /jobs/:id -> delete the "id" job.
     */
    @RequestMapping(value = "/jobs/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        log.debug("REST request to delete Job : {}", id);
        jobRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("job", id.toString())).build();
    }
}
