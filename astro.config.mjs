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
