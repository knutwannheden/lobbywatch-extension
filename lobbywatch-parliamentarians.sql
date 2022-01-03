select concat_ws(',', case when length(coalesce(zweiter_vorname, '')) > 0 then concat(vorname, ' ', zweiter_vorname) else vorname end, coalesce(vorname_kurz, ''), nachname, id)
from parlamentarier pa
where exists (select null from in_rat where parlamentarier_id = pa.id and now() between von and coalesce(bis, now()))
order by 1
;