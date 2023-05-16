import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface IssuseDataTable {
  id: string;
  application: string;
  building: string;
  room: string;
  status: string;
  priority: string;
  assignee: string;
}

const ISSUES_DATA: IssuseDataTable[] = [
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Δ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΦ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3Γ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32Η", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΞ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3Κ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3Λ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΣ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΦΔ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3Ρ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32ΦΔ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32ΔΦ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΦ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΣΔ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3Φ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΦΦΔΔ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32ΔΦ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32ΔΔΦΦ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΦΔΣ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΦΣΔ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "ΑΣΦΔ32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32Φ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3ΦΣ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32Φ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3ΔΣ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32Δ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3Δ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3ΔΔ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32Δ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32Δ", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3ΔΕΦΦ2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3Ε2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α3ς2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α34Ρς2", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α342", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α352", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α352", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},
  {id: "49588", application: "Βλάβη προτζέκτορα", building: "marsaleio megaro",room: "Α32", status: "Προς ανάθεση", priority: "Υψηλή", assignee: "Γιάννης Κ"},

];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<IssuseDataTable> {
  data: IssuseDataTable[] = ISSUES_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IssuseDataTable[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: IssuseDataTable[]): IssuseDataTable[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IssuseDataTable[]): IssuseDataTable[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        // case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
