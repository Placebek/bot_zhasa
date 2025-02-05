// import { Injectable } from '@nestjs/common';
// import { G4F } from 'g4f';

// @Injectable()
// export class G4FService {
//   async askGpt(prompt: string): Promise<string> {
//     try {
//       const response = await new G4F().chat({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: prompt }],
//       });

//       return response ?? 'Ошибка получения ответа';
//     } catch (error) {
//       console.error('Ошибка при запросе к g4f:', error);
//       return 'Ошибка обработки запроса';
//     }
//   }
// }
