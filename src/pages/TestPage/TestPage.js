import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function TestPage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>sr no.</th>
            <th>Name</th>
            <th>phone no.</th>
            <th>address</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nilu yadav</td>
            <td>913547589</td>
            <td>surat</td>
            <td>active</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Ashwini Gaykwad </td>
            <td>8800376459</td>
            <td>chennai</td>
            <td>active</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Ankita makwana</td>
            <td>900025467</td>
            <td>bharuch</td>
            <td>active</td>
          </tr>
          <tr>
            <td>4</td>
            <td>priyanka singh</td>
            <td>8866737389</td>
            <td>vapi</td>
            <td>active</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Dipika patel</td>
            <td>8866737389</td>
            <td>vadodra</td>
            <td>active</td>
          </tr>
          <tr>
            <td>6</td>
            <td>pinki patel</td>
            <td>8866737389</td>
            <td>surat</td>
            <td>active</td>
          </tr>
          <tr>
            <td>7</td>
            <td>hariya patel</td>
            <td>8866737389</td>
            <td>surat</td>
            <td>active</td>
          </tr>
          <tr>
            <td>8</td>
            <td>shant patel</td>
            <td>8866737389</td>
            <td>surat</td>
            <td>active</td>
          </tr>
          <tr>
            <td>9</td>
            <td>hitesh patel</td>
            <td>8866737389</td>
            <td>surat</td>
            <td>active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
