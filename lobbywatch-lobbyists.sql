select concat_ws(',', case when length(coalesce(zweiter_vorname, '')) > 0 then concat(vorname, ' ', zweiter_vorname) else vorname end, coalesce(vorname_kurz, ''), nachname, p.id)
from person p
         join zutrittsberechtigung z on p.id = z.person_id
where now() between coalesce(z.von, now()) and coalesce(z.bis, now())
order by 1
;