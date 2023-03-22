import { Injectable, DependencyLifeTime } from "library/dependencyInjection";

@Injectable({ lifeTime: DependencyLifeTime.Singleton })
export class TestService {
    test(): void {
        console.log("Execute logic");
    }
}
