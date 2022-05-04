select json_arrayagg(json_object('id', p.id, 'first_name', vorname, 'middle_name', zweiter_vorname, 'nickname', vorname_kurz, 'last_name', nachname))
from person p
         join zutrittsberechtigung z on p.id = z.person_id
where now() between coalesce(z.von, now()) and coalesce(z.bis, now())
;