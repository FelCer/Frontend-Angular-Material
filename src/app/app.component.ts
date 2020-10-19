import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import axios from "axios";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Frontend-Angular-Material';
  displayedColumns: string[] = ['id', 'name', 'available', 'bestSeller', 'price', 'img', 'description', 'categories', 'actions'];
  dataSource;
  dataBuy = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    let self = this;
    axios.get('http://localhost:8880/api/getAll')
      .then(function (response) {
        self.dataSource = new MatTableDataSource(response.data.products);
        self.dataSource.paginator = self.paginator;
        self.dataSource.sort = self.sort;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave(data) {
    console.log(`El id es: ${JSON.stringify(data.id)}`)
    console.log(this.dataSource);

    let item = {
      "id": data.id,
      "name": data.name,
      "price": data.price,
      "quantity": 2
    };

    this.dataBuy.data.push(item);
    /**
     * {
     *  "dateCreate": "10/10/2010",
     *  "customer": 10,
     *  "products": [
     *    {
     *      "id": 1,
     *      "quantity": 2
     *    },
     *    {
     *      "id": 2,
     *      "quantity": 1
     *    }
     *  ]
     * }
     */
  }

  buy(){
    console.log(this.dataBuy);
  }
}