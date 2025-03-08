## Modified (5)

* `DELETE /calendars/{calendarId}/events/{eventId}`
  * **[Breaking]** Query parameter removed: `userIp`
    * Removing a resource is always breaking unless it was deprecated before **[Breaking]**
* `GET /calendars/{calendarId}/events/{eventId}`
  * **[Breaking]** Query parameter removed: `userIp`
    * Removing a resource is always breaking unless it was deprecated before **[Breaking]**
* `PATCH /calendars/{calendarId}/events/{eventId}`
  * **[Breaking]** Query parameter removed: `userIp`
    * Removing a resource is always breaking unless it was deprecated before **[Breaking]**
* `POST /calendars/{calendarId}/events/import`
  * Query parameter added: `foo`
* `PUT /calendars/{calendarId}/events/{eventId}`
  * **[Breaking]** Query parameter removed: `userIp`
    * Removing a resource is always breaking unless it was deprecated before **[Breaking]**

