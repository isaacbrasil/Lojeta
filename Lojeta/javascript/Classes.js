class User {
	constructor(name, email, Adress){
		this.name = name;
		this.email = email;
		this.Adress = Adress;
	}
}
class Adress {
	constructor(str, district, num, qd, lt, complement, state, city, cep){
        this.str = str;
        this.district = district;
        this.num = num;
        this.qd = qd;
        this.lt = lt;
        this.complement = complement;
        this.state = state;
        this.city = city;
    }
}