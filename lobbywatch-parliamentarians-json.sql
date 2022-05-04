select json_arrayagg(json_object('id', id, 'first_name', vorname, 'middle_name', zweiter_vorname, 'nickname', vorname_kurz, 'last_name', nachname))
from parlamentarier pa
where exists (select null from in_rat where parlamentarier_id = pa.id and now() between von and coalesce(bis, now()))
;