// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// `site` (y `base`, si el sitio no se publica en la raíz del dominio)
	// deben configurarse cuando se confirme la organización/dominio real
	// de GitHub Pages — ver docs/PUBLICACION.md. No se asume un valor
	// aquí para no inventar una URL de hosting no confirmada.
	site: 'https://academy.ficlabs.com.mx',
	integrations: [
		starlight({
			title: 'FIC Academy',
			description:
				'Recursos, actividades y materiales académicos para estudiantes de la Facultad de Informática Culiacán, UAS.',
			
			favicon: '/favicon.png',
			logo: {
				light: './src/assets/logo-fic-1.png',
				dark: './src/assets/logo-fic-2.png',
				alt: 'Facultad de Informática Culiacán — Universidad Autónoma de Sinaloa',
			},
			customCss: ['./src/styles/custom.css'],
			social: [],
			sidebar: [
				{
					label: 'Inicio',
					link: '/',
				},
				{
					label: 'Materias',
					items: [
						{
							label: 'DBA — Gestión de Seguridad y Desempeño de BD',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/dba' },
								{
									label: 'Unidad 1 — Introducción a la Gestión de Bases de Datos',
									items: [
										{ label: 'Introducción', slug: 'materias/dba/unidad-01' },
										{
											label: 'Presentación',
											slug: 'materias/dba/unidad-01/presentacion',
										},
										{
											label: '1. El rol del DBA',
											slug: 'materias/dba/unidad-01/01-rol-del-dba',
										},
										{
											label: '2. Responsabilidades operativas',
											slug: 'materias/dba/unidad-01/02-responsabilidades-operativas',
										},
										{
											label: '3. Ambientes de trabajo',
											slug: 'materias/dba/unidad-01/03-ambientes-de-trabajo',
										},
										{
											label: '4. Arquitectura relacional',
											slug: 'materias/dba/unidad-01/04-arquitectura-relacional',
										},
										{
											label: '5. Arquitectura NoSQL',
											slug: 'materias/dba/unidad-01/05-arquitectura-nosql',
										},
										{
											label: '6. Cierre y autoevaluación',
											slug: 'materias/dba/unidad-01/06-cierre-y-autoevaluacion',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/dba/unidad-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/dba/unidad-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/dba/unidad-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/dba/unidad-01/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/dba/unidad-01/actividades/actividad-5' },
												{ label: 'Actividad 6', slug: 'materias/dba/unidad-01/actividades/actividad-6' },
												{ label: 'Actividad 7 (evidencia oficial)', slug: 'materias/dba/unidad-01/actividades/actividad-7' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — PostgreSQL',
													slug: 'materias/dba/unidad-01/laboratorios/laboratorio-1-postgresql',
												},
												{
													label: 'Laboratorio 2 — MongoDB',
													slug: 'materias/dba/unidad-01/laboratorios/laboratorio-2-mongodb',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/dba/unidad-01/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/dba/unidad-01/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/dba/unidad-01/referencias/lecturas-complementarias',
												},
												{
													label: 'Casos reales completos',
													slug: 'materias/dba/unidad-01/referencias/casos-reales',
												},
											],
										},
									],
								},
								{
									label: 'Unidad 2 — Seguridad, privacidad y control de acceso',
									items: [
										{ label: 'Introducción', slug: 'materias/dba/unidad-02' },
										{
											label: 'Presentación',
											slug: 'materias/dba/unidad-02/presentacion',
										},
										{
											label: 'Manual del estudiante',
											slug: 'materias/dba/unidad-02/manual-estudiante',
										},
										{
											label: 'Actividades',
											slug: 'materias/dba/unidad-02/actividades',
										},
										{
											label: 'Evaluación',
											slug: 'materias/dba/unidad-02/evaluacion',
										},
										{
											label: 'Referencias',
											slug: 'materias/dba/unidad-02/referencias',
										},
									],
								},
							],
						},
						{
							label: 'Taller Integrador de Especialización',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/taller-integrador' },
								{
									label: 'Bloque I — Del problema al producto',
									items: [
										{ label: 'Introducción', slug: 'materias/taller-integrador/bloque-01' },
										{
											label: 'Presentación',
											slug: 'materias/taller-integrador/bloque-01/presentacion',
										},
										{
											label: '1. Desarrollo profesional de software',
											slug: 'materias/taller-integrador/bloque-01/01-desarrollo-profesional-de-software',
										},
										{
											label: '2. Conformación de equipos',
											slug: 'materias/taller-integrador/bloque-01/02-conformacion-de-equipos',
										},
										{
											label: '3. Introducción a Scrum',
											slug: 'materias/taller-integrador/bloque-01/03-introduccion-a-scrum',
										},
										{
											label: '4. Definición del proyecto',
											slug: 'materias/taller-integrador/bloque-01/04-definicion-del-proyecto',
										},
										{
											label: '5. Sprint 0 — qué debes producir',
											slug: 'materias/taller-integrador/bloque-01/05-sprint-0-que-debes-producir',
										},
										{
											label: '6. Cierre y resumen',
											slug: 'materias/taller-integrador/bloque-01/06-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-4' },
												{ label: 'Actividad 5 (evidencia oficial)', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-5' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Laravel desde cero',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-1-laravel-desde-cero',
												},
												{
													label: 'Laboratorio 2 — CRUD con Laravel',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-2-crud-laravel',
												},
												{
													label: 'Laboratorio 3 — Historias de usuario',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-3-historias-de-usuario',
												},
												{
													label: 'Laboratorio 4 — Sprint 0',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-4-sprint-0',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/taller-integrador/bloque-01/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/taller-integrador/bloque-01/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/taller-integrador/bloque-01/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
								{
									label: 'Bloque II — Desarrollo colaborativo y arquitectura',
									items: [
										{ label: 'Introducción', slug: 'materias/taller-integrador/bloque-02' },
										{
											label: 'Presentación',
											slug: 'materias/taller-integrador/bloque-02/presentacion',
										},
										{
											label: '1. Git y control de versiones',
											slug: 'materias/taller-integrador/bloque-02/01-git-y-control-de-versiones',
										},
										{
											label: '2. Trabajo colaborativo con Git',
											slug: 'materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git',
										},
										{
											label: '3. Integración del trabajo',
											slug: 'materias/taller-integrador/bloque-02/03-integracion-del-trabajo',
										},
										{
											label: '4. Arquitectura de software',
											slug: 'materias/taller-integrador/bloque-02/04-arquitectura-de-software',
										},
										{
											label: '5. Patrones de diseño',
											slug: 'materias/taller-integrador/bloque-02/05-patrones-de-diseno',
										},
										{
											label: '6. Primer incremento — qué debes producir',
											slug: 'materias/taller-integrador/bloque-02/06-primer-incremento-que-debes-producir',
										},
										{
											label: '7. Cierre y resumen',
											slug: 'materias/taller-integrador/bloque-02/07-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-5' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Git colaborativo',
													slug: 'materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo',
												},
												{
													label: 'Laboratorio 2 — Arquitectura inicial',
													slug: 'materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial',
												},
												{
													label: 'Laboratorio 3 — Patrón de diseño',
													slug: 'materias/taller-integrador/bloque-02/laboratorios/laboratorio-3-patron-de-diseno',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/taller-integrador/bloque-02/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/taller-integrador/bloque-02/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/taller-integrador/bloque-02/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
							],
						},
						{
							label: 'Lógica de Programación y Pensamiento Computacional',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/logica-programacion' },
								{
									label: 'Unidad I — Introducción a la programación',
									items: [
										{ label: 'Introducción', slug: 'materias/logica-programacion/unidad-01' },
										{
											label: 'Presentación',
											slug: 'materias/logica-programacion/unidad-01/presentacion',
										},
										{
											label: '1. Importancia de aprender a programar',
											slug: 'materias/logica-programacion/unidad-01/01-importancia-de-programar',
										},
										{
											label: '2. Computadora, algoritmo, programa y lenguaje',
											slug: 'materias/logica-programacion/unidad-01/02-computadora-algoritmo-programa-lenguaje',
										},
										{
											label: '3. Herramientas para representar algoritmos',
											slug: 'materias/logica-programacion/unidad-01/03-herramientas-para-representar-algoritmos',
										},
										{
											label: '4. Razonamiento lógico y pensamiento computacional',
											slug: 'materias/logica-programacion/unidad-01/04-razonamiento-logico-y-pensamiento-computacional',
										},
										{
											label: '5. Resolución de problemas en forma algorítmica',
											slug: 'materias/logica-programacion/unidad-01/05-resolucion-de-problemas-en-forma-algoritmica',
										},
										{
											label: '6. Cierre y resumen',
											slug: 'materias/logica-programacion/unidad-01/06-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-5' },
												{ label: 'Actividad 6 (evidencia de cierre)', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-6' },
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/logica-programacion/unidad-01/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/logica-programacion/unidad-01/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/logica-programacion/unidad-01/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
								{
									label: 'Unidad II — Elementos algorítmicos básicos',
									items: [
										{ label: 'Introducción', slug: 'materias/logica-programacion/unidad-02' },
										{
											label: 'Presentación',
											slug: 'materias/logica-programacion/unidad-02/presentacion',
										},
										{
											label: '1. Tipos de datos',
											slug: 'materias/logica-programacion/unidad-02/01-tipos-de-datos',
										},
										{
											label: '2. Expresiones',
											slug: 'materias/logica-programacion/unidad-02/02-expresiones',
										},
										{
											label: '3. Operadores',
											slug: 'materias/logica-programacion/unidad-02/03-operadores',
										},
										{
											label: '4. Identificadores',
											slug: 'materias/logica-programacion/unidad-02/04-identificadores',
										},
										{
											label: '5. Constantes y variables',
											slug: 'materias/logica-programacion/unidad-02/05-constantes-y-variables',
										},
										{
											label: '6. Funciones matemáticas',
											slug: 'materias/logica-programacion/unidad-02/06-funciones-matematicas',
										},
										{
											label: '7. Resolución de expresiones',
											slug: 'materias/logica-programacion/unidad-02/07-resolucion-de-expresiones',
										},
										{
											label: '8. Herramientas de compilación',
											slug: 'materias/logica-programacion/unidad-02/08-herramientas-de-compilacion',
										},
										{
											label: '9. Cierre y resumen',
											slug: 'materias/logica-programacion/unidad-02/09-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-5' },
												{ label: 'Actividad 6', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-6' },
												{ label: 'Actividad 7', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-7' },
												{ label: 'Actividad 8 (evidencia de cierre)', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-8' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — PSeInt',
													slug: 'materias/logica-programacion/unidad-02/laboratorios/laboratorio-1-pseint',
												},
												{
													label: 'Laboratorio 2 — Resolución de expresiones',
													slug: 'materias/logica-programacion/unidad-02/laboratorios/laboratorio-2-resolucion-expresiones',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/logica-programacion/unidad-02/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/logica-programacion/unidad-02/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/logica-programacion/unidad-02/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
							],
						},
						{
							label: 'Pruebas de Software',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/pruebas-software' },
								{
									label: 'Unidad I — Fundamentos de pruebas y aseguramiento de calidad',
									items: [
										{ label: 'Introducción', slug: 'materias/pruebas-software/unidad-01' },
										{
											label: 'Presentación',
											slug: 'materias/pruebas-software/unidad-01/presentacion',
										},
										{
											label: '1. Calidad de software',
											slug: 'materias/pruebas-software/unidad-01/01-calidad-de-software',
										},
										{
											label: '2. Garantía, aseguramiento, verificación y validación',
											slug: 'materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion',
										},
										{
											label: '3. Propósito de las pruebas de software',
											slug: 'materias/pruebas-software/unidad-01/03-proposito-de-las-pruebas',
										},
										{
											label: '4. Principios generales de pruebas',
											slug: 'materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas',
										},
										{
											label: '5. Cobertura y métricas básicas',
											slug: 'materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas',
										},
										{
											label: '6. Cierre y resumen',
											slug: 'materias/pruebas-software/unidad-01/06-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-4' },
												{ label: 'Actividad 5 (evidencia oficial)', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-5' },
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/pruebas-software/unidad-01/evaluacion',
										},
										{
											label: 'Referencias',
											slug: 'materias/pruebas-software/unidad-01/referencias',
										},
									],
								},
							],
						},
						{
							label: 'Otras materias (en preparación)',
							slug: 'materias',
						},
					],
				},
			],
		}),
	],
});
