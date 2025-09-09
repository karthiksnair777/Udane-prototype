import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function POSEmployee() {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function loadEmployees() {
      const { data } = await supabase
        .from('employees')
        .select('*')
        .eq('shop_id', localStorage.getItem('shop_id'));
      
      if (data) setEmployees(data);
    }
    loadEmployees();
  }, []);

  const startShift = async (employeeId) => {
    const { data } = await supabase
      .from('shifts')
      .insert([{
        employee_id: employeeId,
        start_time: new Date().toISOString(),
        shop_id: localStorage.getItem('shop_id')
      }])
      .select()
      .single();
    
    if (data) setShifts([...shifts, data]);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Employee Management</h2>
      
      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        {employees.map(emp => (
          <div key={emp.id} style={{
            padding: "15px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{emp.name}</strong>
                <div>{emp.role}</div>
              </div>
              <button onClick={() => startShift(emp.id)}>
                Start Shift
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
