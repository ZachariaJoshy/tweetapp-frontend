import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError, Subject } from 'rxjs';
import { User } from '../auth/auth.model';
import { Router } from '@angular/router';
const headers = new Headers;


export interface ResponseData {
    id: string;
    email: string;
    username: string;
}


export interface Tweet {
    id: string,
    createdDateTime: string,
    username: string,
    message: string,
    noOfLikes: string

}


@Injectable({
    providedIn: 'root'
})
export class ApiAccessService implements OnInit{

    userData!: {
        username: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string

    };
    ngOnInit() {

    }
    
    user = new BehaviorSubject<User|null>(null);

  

    constructor(private http: HttpClient, private route: Router) {

        
        
    }



    createPost(message:string) {
       this.userData = JSON.parse(localStorage.getItem('userData')!);

        return this.http.post<ResponseData>('http://localhost:8080/api/v1.0/tweets/addTweet',
        {
            username: this.userData.username ,
            message: message,

        })

}

getMyTweet() {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    return this.http.get<Tweet[]>('http://localhost:8080/api/v1.0/tweets/'+ this.userData.username);

}

updateMyTweet(id:string, newMessage:string) {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    console.log(id)
    return this.http.put<Tweet>('http://localhost:8080/api/v1.0/tweets/updateTweet/' + id,
    {
        username: this.userData.username,
        message: newMessage
    });



}


deleteTweet(id:string){
    this.userData = JSON.parse(localStorage.getItem('userData')!);

    return this.http.delete<any>('http://localhost:8080/api/v1.0/tweets/'+this.userData.username +'/deleteTweet/' + id,);

}


getAllTweets(){


    return this.http.get<Tweet[]>('http://localhost:8080/api/v1.0/tweets/allTweets');


}

forgetPassword(username:string, password:string){
    return this.http.put<any>('http://localhost:8080/api/v1.0/tweets/forgetPassword',{
        username:username,
        newPassword: password
    })
}

likeTweet(id:string){
    console.log(id)
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    return this.http.put<Tweet>('http://localhost:8080/api/v1.0/tweets/likeTweet',
    {
        username: this.userData.username,
        id: id
    });
}





}
