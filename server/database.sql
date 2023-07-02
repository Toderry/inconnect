/*select et.tag_id, t.picture_url from "event_to_tag" as et
inner join tag as t on et.tag_id=t.id where et.event_id = 4;*/
/*select t.id from "event_to_tag" as et
inner join tag as t on et.tag_id=t.id where et.event_id = 3;*/
select tag_id from "event_to_tag" where event_id = 3;