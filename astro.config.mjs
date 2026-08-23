// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// `site` (y `base`, si el sitio no se publica en la raíz del dominio)
	// deben configurarse cuando se confirme la organización/dominio real
	// de GitHub Pages — ver docs/PUBLICACION.md. No se asume un valor
	// aquí para no inventar una URL de hosting no confirmada.
	integrations: [
		starlight({
			title: 'DBA · Portal del Estudiante',
			description:
				'Materiales públicos para el estudiante — Facultad de Informática Culiacán, UAS.',
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
							label: 'Otras materias (en preparación)',
							slug: 'materias',
						},
					],
				},
			],
		}),
	],
});
